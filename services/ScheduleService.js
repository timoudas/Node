const { ScheduleModel } = require("../models/Schedule");


async function getSchedule(){

    var data = await ScheduleModel.aggregate()
        .sort({
            'provisionalKickoff.millis': -1
        })
        .addFields({
            'date': {
                '$toDate': '$provisionalKickoff.millis'
            },
            'currentDate': '$$NOW'
        })
        .match({
            '$expr': { '$gt': ['$date', '$currentDate'] }
        })

        .project({
            'dateString': {'$dateToString': {'format':'%d/%m %H:%M', 'date':'$date'} },
            'teams': 1,
            'currentDate': 1


        })
        .sort({'dateString': 1})
        .limit(7)
    return data
}

module.exports = {
    getSchedule,
}