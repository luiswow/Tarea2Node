var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var biciRouter = require('./routes/bicicletaRoutes');
var apiBici = require('./routes/api/bicicletaapi');
var usuariosAPIRouter = require('./routes/api/usuarios');

var app = express();

var mongoose = require('mongoose');
var db = "mongodb://localhost/red-bicicletas";
mongoose.connect(db,{
  useUnifiedTopology: true, 
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
var dbConnection = mongoose.connection;
dbConnection.on('error',console.error.bind(console,'MongoDB Connection Error'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicleta',biciRouter);
app.use('/apiBicicletas',apiBici);
app.use('/apiUsuarios', usuariosAPIRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
