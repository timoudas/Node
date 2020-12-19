const { TeamSquadsModel } = require("../models/TeamSquads");

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

getPlayers(274, 2)

module.exports = {
    getPlayers,
    getTeams,
}
