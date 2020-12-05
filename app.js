const express = require("express");
const app = express();

app.route("/hello").get((req, res, next) => {
  res.status(200).json({
    status: "ok",
    message: "This is my first route.",
  });
  next();
});

//Handling undefined routes
app.all("*", (req, res, next) => {
  res.status(404).json(`Can't find${req.originalUrl}`);
  //next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
