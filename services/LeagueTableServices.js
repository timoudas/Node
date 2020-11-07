const { LeagueStandingsModel } = require("../models/LeagueStanding");
const { TeamStandingsModel } = require("../models/TeamStandings");


/** 
 * Gets league table from db
 * @param {string} SeasonId - Id for specific season
*/
async function getTable(seasonId, tableType="overall", ) {

        seasonId = parseInt(seasonId);
        var tableType = tableType

    var data = await LeagueStandingsModel.aggregate()
        .match({
            'seasonId': seasonId
        })
        .unwind(
            `$${tableType}`
        )
        .project({
            'position': 1,
            'team_shortName': 1,
            'played': `$${tableType}.played`,
            'won': `$${tableType}.won`,
            'drawn': `$${tableType}.drawn`,
            'lost': `$${tableType}.lost`,
            'goalsFor': `$${tableType}.goalsFor`,
            'goalsAgainst': `$${tableType}.goalsAgainst`,
            'goalsDifference': `$${tableType}.goalsDifference`,
            'points': `$${tableType}.points`,
            '_id': 0,
        })
        .sort({
            'position': 1
        });
    return data;
}

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

/**
 * Gets all seasonsIds and seasonLabels from db
 */
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

async function filterMatchweeks(seasonId) {
    seasonId = parseInt(seasonId);
    var data = await TeamStandingsModel.aggregate()
    .match({
        'seasonId': seasonId
    })
    .group({
        '_id': '$gameweek', 'matchweek': { '$first': '$gameweek' }
    })
    .sort({
        '_id': 1
    });
    var allMatchWeeks = data.slice(-1)[0]['_id']
    data.unshift({'_id':allMatchWeeks, 'matchweek': 'All Matchweeks'})
    return data;
}

async function teamForm(){
    //get teams fort
}

module.exports = {
    getTable,
    latestSeasonId,
    filterTableSeason,
    filterMatchweeks,
    teamForm,
}