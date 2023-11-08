const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Handle Errors
const handleErrors = err => {
  console.log(err.message, err.code);
  let errors = {
    email: '',
    password: '',
    passwordconfirm: '',
    username: '',
    phone: '',
    spaceerror: '',
  };

  //incorrect email
  if (err.message === 'incorrect email') {
    errors.email = '가입되지 않은 이메일입니다';
  }

  //incorrect password
  if (err.message === 'incorrect password') {
    errors.password = '비밀번호가 틀립니다';
  }

  //include space
  if (err.message === 'include space') {
    errors.spaceerror = '입력란에 공백을 넣지 마세요';
  }

  //username length error
  if (err.message === 'username length error') {
    errors.username = '2자리 이상의 이름을 입력해주세요';
  }

  //phone length error
  if (err.message === 'phone length error') {
    errors.phone = '11자리의 전화번호를 입력해주세요';
  }

  //password confirm error
  if (err.message === 'password confirm error') {
    errors.passwordconfirm = '비밀번호가 일치하지 않습니다. 다시 시도해 보세요';
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.email = '이미 사용중인 이메일입니다';
    return errors;
  }

  //validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message; //path = email or password
    });
  }

  return errors;
};

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
    const errors = handleErrors(err);
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
    const errors = handleErrors(err);
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

        await User.findOneAndUpdate(filter, update);
        res.status(200).json({ user: user._id });
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
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
      res.locals.user = user;
      res.status(200).json({ user: user });
    }
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
