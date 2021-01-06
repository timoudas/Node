const { LeagueStandingsModel } = require("../models/LeagueStanding");

/**
 * Gets latest season from db
 */
async function latestSeasonId() {
    var data = await LeagueStandingsModel.aggregate()
        .group({
            '_id': '$seasonId', 'SeasonLabel': { '$first': '$seasonLabel' }
        })
        .project({
            'season': {
                '$substr': ['$SeasonLabel', 0, 4]
            },
        })
        .sort({
            'season': -1
        })
        .project({
            'season': 0
        })
        .limit(1);
    var seasonId = data[0]['_id'];
    return seasonId;
}

async function latestSeasonLabel() {
    var data = await LeagueStandingsModel.aggregate()
        .group({
            '_id': '$seasonId', 'SeasonLabel': { '$first': '$seasonLabel' }
        })
        .sort({
            'SeasonLabel': -1
        })
        .project({
            'SeasonLabel': 1
        })
        .limit(1);
    var seasonId = data[0]['SeasonLabel'];
    return seasonId;
}

async function getSeasons() {
    var data = await LeagueStandingsModel.aggregate()
    .group({
        '_id': {'seasonId': '$seasonId', 'seasonLabel': '$seasonLabel'}
    })
    .project({
        'seasonId': '$_id.seasonId',
        'seasonLabel': '$_id.seasonLabel',
        '_id': 0
    })
    .sort({
        'seasonLabel': -1
    })
    return data
}


module.exports = {
    latestSeasonId,
    latestSeasonLabel,
    getSeasons,
}