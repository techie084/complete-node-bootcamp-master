// Third Party Modules
const express = require('express');
const morgan = require('morgan');

// My own Modules
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Create an Express application
const app = express();

// Third party middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// MiddleWare = stands between the response and the request(vice-versa)
app.use(express.json());

// Middle-Ware for serving static file to the browser
app.use(express.static(`${__dirname}/public`));

// Creating my own MiddleWare
app.use((req, res, next) => {
  console.log('Hello From The Middle-Ware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// -------------- Mount Routing Handles -------------------
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
