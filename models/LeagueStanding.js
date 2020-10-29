const mongoose = require('mongoose')


var LeagueStandingsSchema = new mongoose.Schema({}, 
{ collection : 'league_standings' });

var PlayerStatsSchema = new mongoose.Schema({}, 
    { collection : 'player_stats' });

var FixtureStatsSchema = new mongoose.Schema({}, 
    { collection : 'fixture_stats' });

var TeamStandingsSchema = new mongoose.Schema({}, 
    { collection : 'team_standings' });

var TeamSquadsSchema = new mongoose.Schema({}, 
    { collection : 'team_squads' });

var PlayerFixtureStatsSchema = new mongoose.Schema({}, 
    { collection : 'fixture_player_stats' });

// Compile model from schema
var LeagueStandingsModel = mongoose.model('league_standings', LeagueStandingsSchema);
var PlayerStatsModel = mongoose.model('player_stats', PlayerStatsSchema);
var FixtureStatsModel = mongoose.model('fixture_stats', FixtureStatsSchema);
var TeamStandingsModel = mongoose.model('team_standings', TeamStandingsSchema);
var TeamSquadsModel = mongoose.model('team_squads', TeamSquadsSchema);
var PlayerFixtureStatsModel = mongoose.model('fixture_player_stats', PlayerFixtureStatsSchema);

async function getTable(seasonId){
    if(seasonId == null){
        var seasonId = 363
    }else{
        seasonId = parseInt(seasonId)
    }
    var data = await LeagueStandingsModel.aggregate()
    .match({
        'seasonId': seasonId
    })
    .project({
            'position': 1,
            'team_shortName': 1,
            'overall_played': 1,
            'overall_won': 1,
            'overall_draw': 1,
            'overall_lost': 1,
            'overall_goalsFor': 1,
            'overall_goalsAgainst': 1,
            'overall_goalsDifference': 1,
            'overall_points': 1,
            '_id': 0,
    })
    return data
}

async function filterTableType(){

}

async function filterTableSeason(){
    var data = await LeagueStandingsModel.aggregate()
    .group({
        '_id': '$seasonId', 'SeasonLabel': {'$first': '$seasonLabel'}
    })
    .sort({
        '_id': -1
    })
    return data
}

async function filterTableMatchweek(){

}




module.exports={
    LeagueStandingsModel,
    PlayerStatsModel,
    FixtureStatsModel,
    TeamSquadsModel,
    TeamSquadsModel,
    PlayerFixtureStatsModel,
    getTable,
    filterTableSeason,
}