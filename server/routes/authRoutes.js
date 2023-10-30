const { Router } = require('express');
const authController = require('../../controllers/authController');
const { requireAuth, checkUser } = require('../../middleware/authMiddleware');

const router = Router();

//routes
router.get('*', checkUser); //remember logged user
router.get('/', (req, res) => res.render('home', { title: 'Copiel' }));

router.get('/signup', (req, res) =>
  res.render('signup', { title: 'Copiel : 회원가입' })
);
router.get('/login', (req, res) =>
  res.render('login', { title: 'Copiel : 로그인' })
);

router.get('/game', (req, res) =>
  res.render('game', { title: 'Copiel : 게임' })
);

//auth routes(for logged users)
router.get('/leaderboard', requireAuth, (req, res) =>
  res.render('leaderboard', { title: 'Copiel : 리더보드' })
);
router.get('/changeusername', requireAuth, (req, res) => {
  res.render('changeusername', { title: 'Copiel : 이름 바꾸기' });
});

//logout_get
router.get('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); //delete cookie(token)
  res.redirect('/');
});

//post routes
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/changeusername', authController.changeusername_post);

module.exports = router;
