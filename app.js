// app.js
const methodOverride = require('method-override');
const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.route.js');
const postsRouter = require('./routes/posts.route.js');
const commentsRouter = require('./routes/comments.route.js');
const likesRouter = require('./routes/likes.route.js');
const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.use('/api', [usersRouter, postsRouter, commentsRouter, likesRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
