let createError = require('http-errors');
let express = require('express');
const session = require('express-session');
let path = require('path');
let cookieParser = require('cookie-parser');
let flash = require('connect-flash');
let bodyParser = require('body-parser');
require('dotenv').config()
const winston = require('winston');
var methodOverride = require('method-override');

let port = process.env.PORT;


let app = express();

app.set('trust proxy', 1) // trust first proxy

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'marianoCMS',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

/* ENRUTADO */
let indexRouter = require('./routes/index');//ruta del controlador Index
let usersRouter = require('./routes/users');//ruta del controlador Usuarios
let requirementsRouter = require('./routes/requirements');//ruta del controlador Requerimientos
let ratingsRouter = require('./routes/ratings');//ruta del controlador Requerimientos
let reportsRouter = require('./routes/reports');//ruta del controlador Reportes
let categoriesTypesRouter = require('./routes/categoriesTypes');//ruta del controlador Reportes
let tutorialsRouter = require('./routes/tutorialS');//ruta del controlador Reportes


let listen = app.listen(port,()=>{
  console.log("Port listening in :"+port);
});
let moment = require('moment');
moment.locale('es');
app.use(function(req, res, next){
  res.locals.session = req.session;
  res.locals.moment = moment;
  next();
});


//logger de errores
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/requirements', requirementsRouter);
app.use('/ratings', ratingsRouter); 
app.use('/reports', reportsRouter); 
app.use('/categoriesTypes', categoriesTypesRouter); 
app.use('/tutorials', tutorialsRouter); 

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

module.exports = app;


