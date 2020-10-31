'use strict'

const homeController = {}
const { registerDecorator } = require('handlebars')
const { Collection } = require('mongoose')
const LeagueStandingServices = require('../services/LeagueTableServices')
const db = require('../_helpers/db')
let homeAwayValue = 1
var seasonId = async () => {
    return await LeagueStanding.latestSeasonId()   
}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.index = async function (req, res) {
    console.log(seasonId)
    try{
        var table = await LeagueStandingServices.getTable(seasonId)
        var seasons = await LeagueStandingServices.filterTableSeason()
    }catch(err){
        console.log(err)
    }
    res.locals.result = table
    res.locals.seasons = seasons
    res.render('home/index');
}

/**
 * This function handles post requests from the client.
 * 
 * @param {*} req req.body.value will contain the value of the button clicked
 * @param {*} res 
 */
homeController.handleButtonClicked = async function (req, res) {
    seasonId = req.body.seasonValue
    homeAwayValue = req.body.homeAwayValue
    res.end();


}

// Exports.
module.exports = homeController