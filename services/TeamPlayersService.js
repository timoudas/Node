const { TeamSquadsModel } = require("../models/TeamSquads");
const { PlayerFixtureStatsModel } = require("../models/FixturePlayer");
const utils = require('../services/utils.js')


/**
 * 
 * @param {string} seasonId - Id for a season
 * Returns an array of objects with teamIds
 * 
 */
async function getTeams(seasonId){
    var data = await TeamSquadsModel.aggregate()
    .match({
        'seasonId': parseInt(seasonId)
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
    console.log(data)
    return data
}

/**
 * 
 * @param {string} seasonId - Id for a season
 * @param {string} teamId - Id for a team
 * Returns an array of objects of all players in a team
 */
async function getPlayers(seasonId, teamId){
    var data = await TeamSquadsModel.aggregate()
    .match({
        'seasonId': parseInt(seasonId),
        'teamId': parseInt(teamId)
    })
    .unwind(
        '$players'
    )
    .group({
        '_id': {
            'players': '$players'
        }
    })
    .project({
        'playerId': '$_id.players.p_id',
        'playerName': '$_id.players.name',
        '_id': 0
    })
    .group({
        '_id': {
            'playerId': '$playerId',
            'playerName': '$playerName'
        }
    })
    .project({
        'playerId': '$_id.playerId',
        'playerName': '$_id.playerName',
        '_id': 0
    })
    console.log(data, 'data')
    return data
}


async function getKeyPassPlayers(){
    var season = await utils.latestSeasonId()
    var data = await PlayerFixtureStatsModel.aggregate()
    .match({
        'seasonId': season
    })
    .group({
        '_id': {
            'id': '$id', 
            'season': '$seasonId', 
        },
        'total_pass': {'$sum': '$total_pass'},
        'total_mins_played': {'$sum': '$mins_played'},
        'name': {'$first': '$name'},
    })
    .project({
        'totalPlaytime': '$total_mins_played',
        'total_pass': 1,
        'averagePasses': {'$cond': [ {'$eq':['$total_mins_played', 0]} , 0,
            {'$multiply':[90, {"$divide":["$total_pass", "$total_mins_played"]}]} ]
        },
        'name': '$name',
        'id': '$_id.id',
        'seasonId': '$_id.season',
        '_id': 0
    })
    .sort({
        'total_pass': -1
    })
    .limit(20)
    .lookup({
        'from': 'team_squads',
        'let': {'id': '$id', 'seasonId': '$seasonId'},
        'pipeline': [
            { '$match': {"$expr": { '$eq': [ "$seasonId", "$$seasonId" ] } } },
            { "$unwind": "$players" },
            { "$match": { "$expr": { "$eq": ["$players.p_id", "$$id"] } } },
         ],
        'as': 'player_stats'
    })
    .unwind(
        'player_stats'
    )
    .project({
        'totalPlaytime': 1,
        'total_pass': 1,
        'averagePasses': 1,
        'name': 1,
        'id': 1,
        'seasonId': 1,
        'teamId': '$player_stats.teamId',
        'teamName': '$player_stats.teamName',
        'appearances': '$player_stats.players.appearances',
        'position': '$player_stats.players.position',
        '_id': 0
    })



    console.log(data)
    return data
}
getKeyPassPlayers()

module.exports = {
    getKeyPassPlayers,
    getPlayers,
    getTeams,
}

// async function getKeyPassPlayers(){
//     var season = await utils.latestSeasonId()
//     var data = await PlayerFixtureStatsModel.aggregate()
//     .match({
//         'seasonId': season
//     })
//     .group({
//         '_id': {
//             'id': '$id', 
//             'season': '$seasonId', 
//         },
//         'total_pass': {'$sum': '$total_pass'},
//         'total_mins_played': {'$sum': '$mins_played'},
//         'name': {'$first': '$name'},
//     })
//     .project({
//         'totalPlaytime': '$total_mins_played',
//         'total_pass': 1,
//         'averagePasses': {'$cond': [ {'$eq':['$total_mins_played', 0]} , 0,
//             {'$multiply':[90, {"$divide":["$total_pass", "$total_mins_played"]}]} ]
//         },
//         'name': '$name',
//         'id': '$_id.id',
//         'seasonId': '$_id.season',
//         '_id': 0
//     })
//     .sort({
//         'total_pass': -1
//     })
//     .limit(20)
//     .lookup({
//         'from': 'player_stats',
//         'let': {'id': '$id', 'seasonId': '$seasonId'},
//         'pipeline': [
//             { '$match':
//                { '$expr':
//                   { '$and':
//                      [
//                        { '$eq': [ "$seasonId", "$$seasonId" ] },
//                        { '$eq': [ "$p_id", "$$id" ] }
//                      ]
//                   }
//                }
//             },
//          ],
//         'as': 'player_stats'
//     })
//     .unwind(
//         'player_stats'
//     )
//     .project({
//         'id': 1,
//         'totalPlaytime': 1,
//         'averagePasses': 1,
//         'name': 1,
//         'seasonId': 1,
//         'appearances': '$player_stats.appearances',
//         'averagePlaytime': {'$divide': ['$totalPlaytime', '$player_stats.appearances']},
//         '_id': 0
//     })
//     .sort({
//         'averagePasses': -1
//     })

//     return data
// }