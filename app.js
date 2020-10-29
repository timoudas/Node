const express = require('express');
var mongoose = require('mongoose');
const hbs = require('express-handlebars');
var bodyParser = require('body-parser');
const { join } = require('path')
const app = express();
const db = require('./_helpers/db');

// VIEW ENGINE
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: join(__dirname, 'views', 'partials')
}));

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/homeRouter'))
app.use('/table', require('./routes/homeRouter'))


app.use('*', (req, res, next) => {
    res.send('Oops! 404: Cant find the requested resource... Sorry')
  })

app.listen(3000, () => console.log('Server running'))