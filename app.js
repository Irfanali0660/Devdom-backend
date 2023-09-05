var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
let mongoose=require('mongoose')
var env=require('dotenv')
env.config();
const socketio = require('socket.io');
const commentSocket = require('./controller/socket/socket');
const replaySocekt = require('./controller/socket/replaysocket');
const chatScoket=require('./controller/socket/chatScoket')

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

var app = express();

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('Database connected... ['+process.env.MONGO_URL+']')
  // next()
}).catch((err)=>{
  console.log(err)
  // next(createError(500))
})

//cors configuration

const corsoptions = {
  origin: 'https://devdomforum.irfanali.club/#/',
  methods: 'GET, POST, PUT ,DELETE,PATCH',
  allowedHeaders: 'Content-Type, Authorization',
  optionsSuccessStatus: 200
};

// view engine setup
app.use(cors(corsoptions))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/users', usersRouter);

function initSocketIo(server){
  const io_commentChats = socketio(server,{
    cors:corsoptions,
    path: '/singlepost'
  });
  const ios = io_commentChats
  commentSocket.chatMessages(ios)

  const io_commentReplay = socketio(server,{
    cors:corsoptions,
    path: '/replaycomment'
  });
  const replay = io_commentReplay
  replaySocekt.chatMessages(replay)

  const io_chat = socketio(server,{
    cors:corsoptions,
    path: '/chat'
  });
  const chat  = io_chat
  chatScoket.chatMessages(chat)
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.json(error);
});

module.exports ={app,initSocketIo};
