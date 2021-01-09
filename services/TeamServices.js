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
async function getTeams(season){
    var season = parseInt(season)
    var data = await TeamSquadsModel.aggregate()
    .match({
        'seasonId': season
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
    var limit = parseInt(limit)
    var data = await TeamStandingsModel.aggregate()   
    .match({
        'seasonId': await utils.latestSeasonId(),
        'team_id': teamId
    })
    .sort({
        'gameweek': 1
    })
    .group({
        '_id': '$teamId',
        'positionAll': {'$addToSet': '$position'},
        'pointsAll': {'$addToSet': '$points'},

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
    /* async function teamForm(){
    var data = await TeamStandingsModel.aggregate()
    .match({
        'seasonId': await utils.latestSeasonId(), 'team_id': 1,
    })
    .sort({
        'gameweek':-1
    })
    .unwind(
        'fixtures'
    )
    .addFields({
        'form' : [],
    })
    .project({
        'form': {
            '$switch': {
                "branches": [
                    {'case': {
                        "$eq": ['$team_id', '$fixtures.home_team_id']
                        }, 'then': {
                            "branches": [
                                {'case:': {"$gt": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'W'},
                                {'case:': {"$eq": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'D'},
                                {'case:': {"$lt": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'L'},
                            ]
                        }
                    },
                    {'case': {
                        "$eq": ['$team_id', '$fixtures.away_team_id']
                        }, 'then': {
                            "branches": [
                                {'case:': {"$gt": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'L'},
                                {'case:': {"$eq": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'D'},
                                {'case:': {"$lt": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'W'},
                            ]
                        }
                    }
                ]
            }
        },
    })
    .out(
        'form_stats'
    )
    return data
}
teamForm() */
}

