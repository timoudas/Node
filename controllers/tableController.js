'use strict'

const tableController = {}
const { registerDecorator } = require('handlebars')
const { Collection } = require('mongoose')
const LeagueStandingServices = require('../services/LeagueTableServices')
let homeAwayValue = 1

var seasonId = async () => {
    return await LeagueStanding.latestSeasonId()   
}
// Exports.
// module.exports ={ tableController, middleware}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
tableController.index = async function (req, res) {
    try{
        var table = await LeagueStandingServices.getTable()
        var seasons = await LeagueStandingServices.filterTableSeason()
    }catch(err){
        console.log(err)
    }
    res.locals.result = table
    res.locals.seasons = seasons
    res.render('table/index');
}

/**
 * This function handles post requests from the client.
 * 
 * @param {*} req req.body.value will contain the value of the button clicked
 * @param {*} res 
 */

tableController.handleSeasonFilter = async function (req, res) {
   
    if(req.body.seasonValue){
        var table = await LeagueStandingServices.getTable(req.body.seasonValue)
        res.json(table)
    }
    res.end();
}

tableController.handleHomeAwayFilter = async function (req, res) {

    seasonId = req.body.seasonValue
    homeAwayValue = req.body.homeAwayValue
    // res.end();
}

// Exports
module.exports = tableController 
