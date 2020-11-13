const { LeagueStandingsModel } = require("../models/LeagueStanding");
const { TeamStandingsModel } = require("../models/TeamStandings");
const { spawn } = require('child_process');




/** 
 * Gets league table from db
 * @param {string} SeasonId - Id for specific season
*/
async function updateTableData(){
    const pyProg = await spawn('python', ['./../premier_league_api/cli_stats/subprocess_cli.py', '-u', '-l', 'en_pr']);
    pyProg.stdout.on('data', function(data) {
    console.log(data.toString());
    })
}

async function getTable(seasonId, tableType="overall",) {

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
    var data = await TeamStandingsModel.aggregate()
    .match({
        'seasonId': await latestSeasonId(), 'team_id': 1,
    })
    .sort({
        'gameweek':-1
    })
    .unwind(
        'fixtures'
    )
    .addFields({
        'form' : [],
    })
    .project({
        'form': {
            '$switch': {
                "branches": [
                    {'case': {
                        "$eq": ['$team_id', '$fixtures.home_team_id']
                        }, 'then': {
                            "branches": [
                                {'case:': {"$gt": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'W'},
                                {'case:': {"$eq": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'D'},
                                {'case:': {"$lt": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'L'},
                            ]
                        }
                    },
                    {'case': {
                        "$eq": ['$team_id', '$fixtures.away_team_id']
                        }, 'then': {
                            "branches": [
                                {'case:': {"$gt": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'L'},
                                {'case:': {"$eq": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'D'},
                                {'case:': {"$lt": ['$fixtures.home_team_score', '$fixtures.awat_team_score']}, 'then': 'W'},
                            ]
                        }
                    }
                ]
            }
        },
    })
    .out(
        'form_stats'
    )
    return data
}
teamForm()

module.exports = {
    getTable,
    latestSeasonId,
    filterTableSeason,
    filterMatchweeks,
    latestSeasonLabel,
    teamForm,
    updateTableData
}