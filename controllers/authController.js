const User = require('../models/User');
const jwt = require('jsonwebtoken');

//에러
const handleErrors = err => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  //incorrect email
  if (err.message === 'incorrect email') {
    errors.email = '가입되지 않은 이메일입니다';
  }

  //incorrect password
  if (err.message === 'incorrect password') {
    errors.password = '비밀번호가 틀립니다';
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

const maxAge = 3 * 24 * 60 * 60;
const createToken = id => {
  return jwt.sign({ id }, 'copiel secret', {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.create({ email, password, username });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); //(key, value, option)
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); //(key, value, option)
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
