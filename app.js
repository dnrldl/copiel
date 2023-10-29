const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

//database connect
const dbURI =
  'mongodb+srv://chosh0206:2whtjddnr2@cluster0.p9ezfwy.mongodb.net/node-auth';
mongoose
  .connect(dbURI)
  .then(result =>
    app.listen(3000, () => {
      console.log('server on');
    })
  )
  .catch(err => console.log(err));

//routes
app.get('*', checkUser); //remember logged user
app.get('/', (req, res) => res.render('home', { title: 'Home' }));
app.get('/game', (req, res) => res.render('game', { title: 'Game' }));
//auth routes(protecting routes)
app.get('/leaderboard', requireAuth, (req, res) =>
  res.render('leaderboard', { title: 'Leader Board' })
);
app.use(authRoutes);
