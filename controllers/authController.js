const User = require('../models/User');
const jwt = require('jsonwebtoken');
const errorHandler = require('./errorHandler');
const sendMail = require('./sendMail');
const bcrypt = require('bcrypt');

//create Token
const maxAge = 3 * 24 * 60 * 60;
const createToken = id => {
  return jwt.sign({ id }, 'copiel secret', {
    expiresIn: maxAge,
  });
};

//create temp password
function generateTempPassword(length) {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 사용할 문자 세트
  let tempPassword = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    tempPassword += charset[randomIndex];
  }

  return tempPassword;
}

module.exports.signup_post = async (req, res) => {
  const { email, password, passwordconfirm, name, username, phone } = req.body;

  try {
    if (
      email.includes(' ') ||
      password.includes(' ') ||
      name.includes(' ') ||
      username.includes(' ')
    )
      throw new Error('include space');
    else if (name.length < 2) throw new Error('name length error');
    else if (username.length < 2) throw new Error('username length error');
    else if (phone.length !== 13) throw new Error('phone length error');
    else if (password !== passwordconfirm)
      throw new Error('password confirm error');
    else {
      const user = await User.create({
        email,
        password,
        name,
        username,
        phone,
      });
      res.status(201).json({ user: user._id });
    }
  } catch (err) {
    const errors = errorHandler.handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email.includes(' ') || password.includes(' '))
      throw new Error('include space');
    else {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    }
  } catch (err) {
    const errors = errorHandler.handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.changeusername_post = async (req, res) => {
  const { username } = req.body;
  const token = req.cookies.jwt;

  try {
    if (username.length < 2) throw new Error('username length error');
    else {
      jwt.verify(token, 'copiel secret', async (err, decodedToken) => {
        const user = await User.findById(decodedToken.id);

        const filter = { _id: user._id };
        const update = { username: username, updateAt: new Date() };

        await User.findOneAndUpdate(filter, { $set: update });
        res.status(200).json({ user: user._id });
      });
    }
  } catch (err) {
    const errors = errorHandler.handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.changepassword_post = async (req, res) => {
  var { currentpassword, password, passwordconfirm } = req.body;
  const token = req.cookies.jwt;

  var decodedToken = await jwt.verify(token, 'copiel secret');
  var user = await User.findById(decodedToken.id);
  var auth = await bcrypt.compare(currentpassword, user.password);

  try {
    if (password.length < 6) throw new Error('password length error');
    else if (currentpassword.includes(' ') || password.includes(' '))
      throw new Error('include space');
    else if (password !== passwordconfirm)
      throw new Error('password confirm error');
    else if (!auth) {
      throw new Error('incorrect current password');
    } else {
      const salt = await bcrypt.genSalt();
      saltedPassword = await bcrypt.hash(password, salt);

      const filter = { _id: user._id };
      const update = { password: saltedPassword, updateAt: new Date() };

      await User.findOneAndUpdate(filter, { $set: update });
      res.status(200).json({ user: user });
    }
  } catch (err) {
    const errors = errorHandler.handleErrors(err);
    console.log(err);
    res.status(400).json({ errors });
  }
};

module.exports.forgotemail_post = async (req, res) => {
  const { name, phone } = req.body;

  try {
    if (name.includes(' ')) throw new Error('include space');
    else if (name.length < 2) throw new Error('name length error');
    else {
      const user = await User.findOne({
        name: name,
        phone: phone,
      });
      if (user == null) {
        throw new Error('find acount is null');
      } else {
        res.locals.user = user;
        res.status(200).json({ user: user });
      }
    }
  } catch (err) {
    console.log(err);
    const errors = errorHandler.handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.forgotpassword_post = async (req, res) => {
  const { email, name, phone } = req.body;

  try {
    if (email.includes(' ') || name.includes(' '))
      throw new Error('include space');
    else if (name.length < 2) throw new Error('name length error');
    else {
      const user = await User.findOne({
        email: email,
        name: name,
        phone: phone,
      });
      if (user == null) throw new Error('find acount is null');
      else {
        var tempPassword = generateTempPassword(12);

        const salt = await bcrypt.genSalt();
        saltedTempPassword = await bcrypt.hash(tempPassword, salt);

        const filter = { _id: user._id };
        const update = { password: saltedTempPassword, updateAt: new Date() };

        await User.findOneAndUpdate(filter, { $set: update });
        sendMail.sendMailToUser(email, tempPassword);
        res.status(200).json({ user: user, password: tempPassword });
      }
    }
  } catch (err) {
    console.log(err);
    const errors = errorHandler.handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.deleteAcount_post = async (req, res) => {
  const { email, password } = req.body;

  const token = req.cookies.jwt;

  var decodedToken = await jwt.verify(token, 'copiel secret');
  var user = await User.findById(decodedToken.id);

  var authPw = await bcrypt.compare(password, user.password);

  try {
    if (email.includes(' ') || password.includes(' '))
      throw new Error('include space');
    else if (email !== user.email) {
      throw new Error('wrong email');
    } else if (!authPw) {
      throw new Error('incorrect password');
    } else {
      console.log(user._id);
      await User.findByIdAndDelete(user._id);
      res.cookie('jwt', '', { maxAge: 1 }); //delete cookie(token)
      res.status(200).json({ user });
    }
  } catch (err) {
    const errors = errorHandler.handleErrors(err);
    res.status(400).json({ errors });
  }
};
