

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const artistdashRoutes = require('./routes/artistdash');
const artistpageRoutes = require('./routes/artistpage');
require('dotenv').config({path: './config/.env'});


require('./config/passport')(passport);

connectDB()


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev')) 

app.use(
    session({
      secret: 'cat people',
      resave: false,
      saveUninitialized: false,
        secure: true,
      store: MongoStore.create({ mongoURL: process.env.DB_STRING }),
    })
  );
  

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/artistdash', artistdashRoutes)
app.use('/artistpage', artistpageRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    