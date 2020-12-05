const express = require('express');
const morgan = require('morgan'); //logging middleware

const app = express();

if (process.env.NODE_DEV === 'development') {
  app.use(morgan('dev'));
}

app.route('/hello').get((req, res, next) => {
  res.status(200).json({
    status: 'ok',
    message: 'This is my first route.',
  });
});

//Handling undefined routes
app.all('*', (req, res, next) => {
  res.status(404).json(`Can't find${req.originalUrl}`);
  //next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
