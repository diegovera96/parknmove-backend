var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// Configura bodyParser para parsear JSON
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

const connection = mysql.createConnection({
  host: 'localhost',
  //port: '3000',
  user: 'express',
  password: 'express',
  database: 'express_db'
});

connection.connect((error) => {
  if (error) {
    console.error('Error de conexión a la base de datos: ' + error.stack);
    return;
  }

  console.log('Conexión a la base de datos establecida con éxito.');
});

connection.query('SELECT * FROM users', (error, results, fields) => {
  if (error) {
    console.error('Error al hacer la consulta: ' + error.stack);
    return;
  }

  console.log('Resultados de la consulta: ', results);
});



module.exports = app;
//test