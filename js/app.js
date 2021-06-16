const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

const mainRoutes = require('../routes');
const cardRoutes = require('../routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req,res,next) => {
  console.log('hello');
  const err = new Error('oh no!');
  err.status = 500;
  next(err); // can pass an object to next to handle errors
});

app.use((req,res,next) => {
  console.log('world');
  next();
});

app.use((req,res,next) => {
  req.message = 'This message made it';
  next(); // signals the end of middleware functions. Can also end by sending response
});

app.use((req,res,next) => {
  console.log(req.message);
  next(); 
});

app.use((req,res,next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error', err);
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});

