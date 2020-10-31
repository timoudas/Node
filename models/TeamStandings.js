const mongoose = require('mongoose')


var TeamStandingsSchema = new mongoose.Schema({}, 
    { collection : 'team_standings' });

var TeamStandingsModel = mongoose.model('team_standings', TeamStandingsSchema);

module.exports={TeamStandingsModel}