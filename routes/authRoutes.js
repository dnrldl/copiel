const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = Router();

//routes
router.get('*', checkUser); //remember logged user
router.get('/', (req, res) => res.render('home', { title: 'Copiel' }));
router.get('/signup', (req, res) =>
  res.render('signup', { title: 'Copiel : Sign up' })
);
router.get('/login', (req, res) =>
  res.render('login', { title: 'Copiel : Login' })
);
router.get('/game', (req, res) =>
  res.render('game', { title: 'Copiel : Game' })
);

//auth routes(for logged users)
router.get('/leaderboard', requireAuth, (req, res) =>
  res.render('leaderboard', { title: 'Copiel : Leader Board' })
);

//logout_get
router.get('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); //cookie(token) delete
  res.redirect('/');
});

//signup_post, login_post
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);

module.exports = router;
