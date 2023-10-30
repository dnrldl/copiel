require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-layouts');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const connectDB = require('./server/config/db');

const app = express();
const PORT = 3000 || process.env.PORT;

//middleware
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

//database connect
connectDB();

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
