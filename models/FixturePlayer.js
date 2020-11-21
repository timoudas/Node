const mongoose = require('mongoose')

var PlayerFixtureStatsSchema = new mongoose.Schema({}, 
    { collection : 'fixture_player_stats' });

var PlayerFixtureStatsModel = mongoose.model('fixture_player_stats', PlayerFixtureStatsSchema);

module.exports = {PlayerFixtureStatsModel}