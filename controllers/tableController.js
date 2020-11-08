'use strict'

const tableController = {}
const { registerDecorator } = require('handlebars')
const { Collection } = require('mongoose')
const LeagueStandingServices = require('../services/LeagueTableServices.js')


var seasonId = async () => {
    const result = await LeagueStandingServices.latestSeasonId()   
    return result
}
var seasonLabel = async () => {
    const result = await LeagueStandingServices.latestSeasonLabel()   
    return result
}

  
/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
tableController.index = async function (req, res) {
    try{
        var matchweeks = await LeagueStandingServices.filterMatchweeks(await seasonId())
        var seasons = await LeagueStandingServices.filterTableSeason()
    }catch(err){
        console.log(err)
    }
    try{
        var table = await LeagueStandingServices.getTable(await seasonId())
        var matchweeks = await LeagueStandingServices.filterMatchweeks(await seasonId())
        var seasons = await LeagueStandingServices.filterTableSeason()
    }catch(err){
        console.log(err)
    }
    res.locals.seasonLabel = await seasonLabel()
    res.locals.result = table
    res.locals.matchweeks = matchweeks
    res.locals.seasons = seasons
    res.render('table/index');
}

/**
 * This function handles post requests from the client.
 * 
 * @param {*} req req.body.value will contain the value of the button clicked
 * @param {*} res 
 */

tableController.handleFilters = async function (req, res) {
    var table = await LeagueStandingServices
    .getTable(req.query.seasonVal, req.query.typeVal)
        res.json(table)
        res.end()
    }



// Exports
module.exports = tableController 
