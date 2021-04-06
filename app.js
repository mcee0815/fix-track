var createError = require('http-errors');
var express = require('express');
const methodOverride = require('method-override')
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const expressSession = require('express-session')
var sass = require('node-sass-middleware');
const dotenv = require("dotenv")

dotenv.config()

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/test';
let fixtrack_db = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qvce1.mongodb.net/test`
mongoose.connect(fixtrack_db, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// import all routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');
var taskRouter = require('./routes/task');
var detailsRouter = require('./routes/details');
var filtersRouter = require('./routes/filters');
var paginationRouter = require('./routes/pagination');

var app = express();
app.use(function(req, res, next) {
  if (!req.user)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.use(
  sass({
      src: __dirname + '/sass',    // Input SASS files
      dest: __dirname + '/public', // Output CSS
      debug: true                
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Method override middleware
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express-session secret
app.use(expressSession({
  secret:'fritz the cat'
}))

// point to assets in public directory 
app.use(express.static(path.join(__dirname, 'public')));


global.loggedIn = null
// check if any user is logged in
app.use('*',(req,res,next)=>{
  loggedIn = req.session.userId
  next()
})

//  registered routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);
app.use('/tasks', taskRouter);
app.use('/details', detailsRouter);
app.use('/filters', filtersRouter);
app.use('/paginated', paginationRouter);
app.use((req,res) => res.render('404'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
