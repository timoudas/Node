/*var mongoose = require('mongoose');
Admin = mongoose.mongo.Admin;
require('dotenv').config()

const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var connection = mongoose.connection.useDb('PremierLeague');
//Bind connection to error event (to get notification of connection errors)
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
    console.log('connected to db');
  });*/
