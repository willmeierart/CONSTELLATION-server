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

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app,
  server
};
