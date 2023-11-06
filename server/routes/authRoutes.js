const { Router } = require('express');
const authController = require('../../controllers/authController');
const {
  requireAuth,
  checkUser,
  preventEnter,
} = require('../../middleware/authMiddleware');

const router = Router();

//routes
router.get('*', checkUser); //remember logged user
router.get('/', (req, res) => res.render('home', { title: 'Copiel' }));

router.get('/signup', preventEnter, (req, res) =>
  res.render('signup', { title: 'Copiel : 회원가입' })
);
router.get('/login', preventEnter, (req, res) =>
  res.render('login', { title: 'Copiel : 로그인' })
);
router.get('/forgotemail', preventEnter, (req, res) =>
  res.render('forgotemail', { title: 'Copiel : 계정 찾기' })
);
router.get('/leaderboard', (req, res) =>
  res.render('leaderboard', { title: 'Copiel : 리더보드' })
);

//stage routes
const stages = [
  { id: '1-1', title: 'Copiel : 1-1' },
  { id: '1-2', title: 'Copiel : 1-2' },
  { id: '1-3', title: 'Copiel : 1-3' },
  { id: '1-4', title: 'Copiel : 1-4' },
  { id: '1-5', title: 'Copiel : 1-5' },
  { id: '1-6', title: 'Copiel : 1-6' },
];

stages.forEach((stage) => {
  router.get(`/${stage.id}`, (req, res) => {
    res.render(`./stages/${stage.id}`, { title: stage.title });
  });
});

//auth routes(for logged users)
router.get('/changeusername', requireAuth, (req, res) => {
  res.render('changeusername', { title: 'Copiel : 이름 바꾸기' });
});

router.get('/profile', requireAuth, (req, res) => {
  res.render('profile', { title: 'Copiel : 프로필' });
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
router.post('/forgotemail', authController.forgotemail_post);

module.exports = router;
