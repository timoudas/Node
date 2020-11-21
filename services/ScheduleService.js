const { ScheduleModel } = require("../models/Schedule");
const { spawn } = require('child_process');

async function getSchedule(){

    var data = await ScheduleModel.aggregate()
        .sort({
            'provisionalKickoff.millis': -1
        })
        .limit(10)
    console.log(data)
    return data
}

module.exports = {
    getSchedule,
}