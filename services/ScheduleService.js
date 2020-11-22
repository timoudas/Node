const { ScheduleModel } = require("../models/Schedule");
const { spawn } = require('child_process');

async function getSchedule(){

    var data = await ScheduleModel.aggregate()
        .sort({
            'provisionalKickoff.millis': -1
        })
        .project({
            'kickoffLabel': {
                '$substr': ['$provisionalKickoff.label', 0, 4]
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