const express = require('express');
const bodyParser = require('body-parser');
const layout = require('express-ejs-layouts');

// root directory
const path = require('path');
const rootDir = path.join(__dirname, '..');

// const session = require('express-session');
// const mongoose = require('mongoose')

//my immports
const adminRoutes = require('./routes/admin');
const indexRoutes = require('./routes/index');

const app = express();

//setting up the template engine and configuration
app.set('view engine','ejs');
app.set('views', path.join(rootDir, 'views'));

app.use(layout);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

//database
const pgp = require('pg-promise');
const db = pgp(process.env.DATABASE_URL);

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);


//server event listener
app.listen(process.env.PORT || 3000);