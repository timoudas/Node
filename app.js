const express = require('express');
var mongoose = require('mongoose');
const hbs = require('express-handlebars');
var bodyParser = require('body-parser');
const { join } = require('path')
const app = express();
const keys = require('./configs/keys')
// const db = require('./_helpers/db');


// Database setup
const db = keys.mongoURI // CREATE THE /configs folder with the file keys.json in it.
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// VIEW ENGINE
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: join(__dirname, 'views', 'partials')
}));

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routing
app.use('/', require('./routes/homeRouter'))
app.use('/', require('./routes/tableRouter'))

app.use('*', (req, res, next) => {
    res.send('Oops! 404: Cant find the requested resource... Sorry')
  })

// Server setup
app.listen(3000, () => console.log('Server running'))