const express = require('express');
const morgan = require('morgan');
const path = require('path');
const layout = require('./views/layout');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res, next) => {
  res.send(layout(''));
});

const PORT = 3000;

const init = () => {
  app.listen(PORT, () => {
    console.log(`App is listening on port:${PORT}`);
  });
};

init();
