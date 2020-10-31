const { LeagueStandingsModel } = require("../models/LeagueStanding");

module.exports = {
    getTable,
    latestSeasonId,
    filterTableSeason,
}

async function getTable(seasonId) {
    if (seasonId == null) {
        var seasonId = 363;
    } else {
        seasonId = parseInt(seasonId);
    }
    var data = await LeagueStandingsModel.aggregate()
        .match({
            'seasonId': seasonId
        })
        .project({
            'position': 1,
            'team_shortName': 1,
            'overall_played': 1,
            'overall_won': 1,
            'overall_draw': 1,
            'overall_lost': 1,
            'overall_goalsFor': 1,
            'overall_goalsAgainst': 1,
            'overall_goalsDifference': 1,
            'overall_points': 1,
            '_id': 0,
        })
        .sort({
            'position': 1
        });
    return data;
}


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

async function filterTableSeason() {
    var data = await LeagueStandingsModel.aggregate()
        .group({
            '_id': '$seasonId', 'SeasonLabel': { '$first': '$seasonLabel' }
        })
        .sort({
            '_id': -1
        });
    return data;
}
