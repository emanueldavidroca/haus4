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
/* CHAT */
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "https://localhost:3001"
  }
});
app.get("/nuevo",(req,res)=>{
  let session_id = req.query.session_id;
  console.log(req.query);
  const data = {
    message:req.query.message,
    rol:req.query.rol,
    idSession:req.query.idSession,
    idChat:req.query.idChat,
    date:req.query.date,
    username:req.query.username
  };
  io.to(session_id).emit("chat_message",JSON.stringify(data));
});

io.on('connection', (socket) => {
  socket.on("join",(msg)=>{
    console.log("chat abierto:"+msg.session_id);
    socket.join(msg.session_id);
  });
  console.log(socket.handshake.query);
  console.log('a user connected');
  socket.on('chat_message', (msg) => {
    console.log('message:'+msg);
  });
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
server.listen(3002, () => {
  console.log(`listening on *:${port}`);
});
/* CHAT */

app.set('trust proxy', 1) // trust first proxy

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

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
let hardwaresRouter = require('./routes/hardwares');//ruta del controlador Hardware
let ratingsRouter = require('./routes/ratings');//ruta del controlador Hardware
let reportsRouter = require('./routes/reports');//ruta del controlador Reportes
let categoriesTypesRouter = require('./routes/categoriesTypes');//ruta del controlador Reportes
let tutorialsRouter = require('./routes/tutorials');//ruta del controlador Reportes
let hardwaresAvailableRouter = require('./routes/hardwaresAvailable');//ruta del controlador Reportes


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
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

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
app.use('/hardwares', hardwaresRouter);
app.use('/ratings', ratingsRouter); 
app.use('/reports', reportsRouter); 
app.use('/categoriesTypes', categoriesTypesRouter); 
app.use('/tutorials', tutorialsRouter); 
app.use('/hardwaresAvailable', hardwaresAvailableRouter); 

module.exports = app;





