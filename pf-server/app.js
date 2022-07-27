var express = require('express');
var bodyParser = require('body-parser');
const { Pool } = require('pg');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

const usersRoute = require("./routes/Users");
const registerRoute = require("./routes/Register");
const relationshipRoute = require("./routes/Relationship");
const sessionsRoute = require("./routes/Sessions");
const eventsRoute = require("./routes/Events");

app.use('/users', usersRoute);
app.use('/register', registerRoute);
app.use('/relationship', relationshipRoute);
app.use('/sessions', sessionsRoute);
app.use('/events', eventsRoute);


// catch 404 and forward to error handler

app.use(function(request, response, next) {
  console.error("EEError!");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = err.message;
  //response.locals.error = request.app.get('env') === 'development' ? err : {};
  response.locals.error = err;

  // render the error page
  response.status(err.status || 500);
});

module.exports = app;
