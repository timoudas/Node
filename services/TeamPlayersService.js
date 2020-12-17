const { TeamSquadsModel } = require("../models/TeamSquads");

async function getTeams(seasonId){
    var data = await ScheduleModel.aggregate()
    .sort({
        'provisionalKickoff.millis': -1
    })
    .project({
        'kickoffLabel': {
            '$substr': ['$provisionalKickoff.label', 17, 5]
        },
        'teams': 1,


    })
    .limit(10)
    console.log(data)
}