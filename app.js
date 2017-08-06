 const express = require('express');
 const path = require('path');
 const favicon = require('serve-favicon');
 const cookieParser = require('cookie-parser');
 const bodyParser = require('body-parser');
 const http = require('http');
 const cors = require('cors')


const auth = require('./routes/auth')
const index = require('./routes/index');
const sockets = require('./sockets');

 const app = express();

 const server = http.createServer(app);
 const io = require('socket.io')(server);

sockets(io);

app.use(cors({
  credentials: true,
  origin: '*'
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/', index);
app.use('/auth', auth)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(500)
  // res.status(err.status || res.statusCode || 500)
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

module.exports = {
  app,
  server
};
