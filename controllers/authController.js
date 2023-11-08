const User = require('../models/User');
const jwt = require('jsonwebtoken');
const errorHandler = require('./errorHandler');

//create Token
const maxAge = 3 * 24 * 60 * 60;
const createToken = id => {
  return jwt.sign({ id }, 'copiel secret', {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  const { email, password, passwordconfirm, username, phone } = req.body;

  try {
    if (
      email.includes(' ') ||
      password.includes(' ') ||
      username.includes(' ')
    ) {
      throw new Error('include space');
    } else if (username.length < 2) {
      throw new Error('username length error');
    } else if (phone.length !== 13) {
      throw new Error('phone length error');
    } else if (password !== passwordconfirm) {
      throw new Error('password confirm error');
    } else {
      const user = await User.create({ email, password, username, phone });
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
    if (email.includes(' ') || password.includes(' ')) {
      throw new Error('include space');
    } else {
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
    if (username.length < 2) {
      throw new Error('username length error');
    } else {
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

module.exports.forgotemail_post = async (req, res) => {
  const { username, phone } = req.body;

  try {
    if (username.includes(' ')) {
      throw new Error('include space');
    } else if (username.length < 2) {
      throw new Error('username length error');
    } else {
      const user = await User.findOne({
        username: username,
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
  const { email, username, phone } = req.body;

  try {
    if (email.includes(' ') || username.includes(' ')) {
      throw new Error('include space');
    } else if (username.length < 2) {
      throw new Error('username length error');
    } else {
      const user = await User.findOne({
        email: email,
        username: username,
        phone: phone,
      });
      if (user == null) {
        throw new Error('find acount is null');
      } else {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user });
      }
    }
  } catch (err) {
    console.log(err);
    const errors = errorHandler.handleErrors(err);
    res.status(400).json({ errors });
  }
};
