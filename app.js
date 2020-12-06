const express = require('express');
const morgan = require('morgan'); //logging middleware
const rateLimit = require('express-rate-limit'); // to block brute force attack
const cookieParser = require('cookie-parser'); // to parse cookie from incoming request
const xss = require('xss-clean'); //Data sanitization against XSS

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

//Limit requets from same IP
app.use('/api', limiter);

//Body parser,readind data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//Cookie parser
app.use(cookieParser());

//Data sanitization against XSS
app.use(xss());

//Handling undefined routes
app.all('*', (req, res, next) => {
  res.status(404).json(`Can't find${req.originalUrl}`);
  //next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
