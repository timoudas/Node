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

    .project({
        'players': 1
    })
    .unwind(
        'players'
    )

    console.log(data)
    return data
}
getPlayers(274, 1)