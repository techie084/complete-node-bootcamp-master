const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

// Create an Express application
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// --------------- GLOBAL MIDDLEWARES ---------------
// Serving static file
app.use(express.static(path.join(__dirname, 'public')));

// Set HTTPS Security Headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'To many request from this IP, Please try again in an hour! ',
});
app.use('/api', limiter);

// Body parser,  reading data from the body into req.body
// MiddleWare = stands between the response and the request(vice-versa)
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NO-SQL injection
app.use(mongoSanitize());

// Data sanitization against XSS (CROSS SIDE SCRIPTING)
app.use(xss());

// Prevent parameter Pollution
app.use(
  hpp({
    whiteList: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Creating my own MiddleWare (TEST - MIDDLEWARE)
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// -------------- Mount Routing Handles -------------------
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// middle-ware for handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this sever!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
