const { TeamSquadsModel } = require("../models/TeamSquads");
const { TeamStandingsModel } = require("../models/TeamStandings");
const { LeagueStatsModel } = require("../models/LeagueStanding");
const utils = require('../services/utils.js')

module.exports = {
    getTeams,
    getTeamProgress,
    getTeamForm
}

/**
 * 
 * @param {string} seasonId - Id for a season
 * Returns an array of objects with teamIds
 * 
 */
async function getTeams(){
    var data = await TeamSquadsModel.aggregate()
    .match({
        'seasonId': await utils.latestSeasonId()
    })
    .group({
        '_id':{
        'teamId': '$teamId',
        'teamName': '$teamName',
        'teamAbbr': '$teamAbbr'
        } 
    })
    .project({
        'teamId': '$_id.teamId',
        'teamName': '$_id.teamName',
        '_id': 0
    })
    .sort({
        'teamName': 1
    })
    return data
}

async function getTeamProgress(teamId){
    var teamId = parseInt(teamId)
    var data = await TeamStandingsModel.aggregate()   
    .match({
        'seasonId': await utils.latestSeasonId(),
        'team_id': teamId
    })
    console.log(data)
    return data
}

getTeamProgress(1)


async function getTeamForm(teamId){
    var teamId = parseInt(teamId)
    var data = await TeamSquadsModel.aggregate()
    .match({
        'seasonId': await utils.latestSeasonId(),
        'teamId': teamId
    })
    // TODO: FINISH QUERY TO RETURN FORM
}

