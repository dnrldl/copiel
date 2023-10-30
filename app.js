require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-layouts');
const cookieParser = require('cookie-parser');

const authRoutes = require('./server/routes/authRoutes');
const connectDB = require('./server/config/db');

const app = express();
const PORT = 3000 || process.env.PORT;

//set middleware
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//set view engine
app.set('view engine', 'ejs');

//connect database
connectDB();

//routes
app.use(authRoutes);

//listen server
app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
