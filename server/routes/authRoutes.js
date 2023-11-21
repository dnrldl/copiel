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
router.get('/forgotpassword', preventEnter, (req, res) =>
  res.render('forgotpassword', { title: 'Copiel : 비밀번호 찾기' })
);
router.get('/leaderboard', (req, res) =>
  res.render('leaderboard', { title: 'Copiel : 리더보드' })
);
router.get('/selectquiz', (req, res) =>
  res.render('selectQuiz', { title: 'Copiel : 퀴즈' })
);

//auth routes(for logged users)
router.get('/changeusername', requireAuth, (req, res) => {
  res.render('changeusername', { title: 'Copiel : 닉네임 바꾸기' });
});

router.get('/changepassword', requireAuth, (req, res) => {
  res.render('changepassword', { title: 'Copiel : 비밀번호 바꾸기' });
});

router.get('/profile', requireAuth, (req, res) => {
  res.render('profile', { title: 'Copiel : 프로필' });
});

router.get('/deleteAcount', requireAuth, (req, res) => {
  res.render('deleteAcount', { title: 'Copiel : 회원 탈퇴하기' });
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
router.post('/changepassword', authController.changepassword_post);
router.post('/forgotemail', authController.forgotemail_post);
router.post('/forgotpassword', authController.forgotpassword_post);
router.post('/deleteAcount', authController.deleteAcount_post);
router.post('/getUserScore', authController.getUserScore_post);
router.post('/sendUserScore', authController.sendUserScore_post);
router.post('/getLoggedUserScore', authController.getLoggedUserScore_post);

module.exports = router;
