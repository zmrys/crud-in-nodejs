const express = require('express');
const morgan = require('morgan'); //logging middleware
const rateLimit = require('express-rate-limit');

const app = express();

if (process.env.NODE_DEV === 'development') {
  app.use(morgan('dev'));
}

const warningMessage = {
  message: 'Too many requests from this IP,Please try again in an hour!',
};

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: warningMessage,
});

app.use('/api', limiter);

//Handling undefined routes
app.all('*', (req, res, next) => {
  res.status(404).json(`Can't find${req.originalUrl}`);
  //next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
