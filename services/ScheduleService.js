const { ScheduleModel } = require("../models/Schedule");


async function getSchedule(){

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
    return data
}

module.exports = {
    getSchedule,
}