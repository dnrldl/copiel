const jwt = require('jsonwebtoken');
const User = require('../models/User');

const preventEnter = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    res.redirect('/');
  } else {
    next();
  }
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check jwt exists & is verified
  if (token) {
    jwt.verify(token, 'copiel secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

//check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'copiel secret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user; //ejs에서 받는 값
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser, preventEnter };
