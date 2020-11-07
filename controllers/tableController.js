'use strict'

const tableController = {}
const { registerDecorator } = require('handlebars')
const { Collection } = require('mongoose')
const LeagueStandingServices = require('../services/LeagueTableServices.js')
let homeAwayValue = 1

var seasonId = async () => {
    const result = await LeagueStandingServices.latestSeasonId()   
    return result
}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
tableController.index = async function (req, res) {
    if (Object.keys(req.query).length === 0){
        console.log(req.query, 'queer')
        try{
            var table = await LeagueStandingServices.getTable(await seasonId())
            var matchweeks = await LeagueStandingServices.filterMatchweeks(await seasonId())
            var seasons = await LeagueStandingServices.filterTableSeason()
        }catch(err){
            console.log(err)
        }
    }
    else{
        console.log(req.query)
        console.log('hello')
    }
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
   console.log(req.query)
    if(req.body.seasonValue){
        console.log(req.query)
        var table = await LeagueStandingServices.getTable(req.query.seasonVal)
        res.json(table)
    }
    res.end();
}


// Exports
module.exports = tableController 
