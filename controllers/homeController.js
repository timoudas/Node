'use strict'

const homeController = {}
const { registerDecorator } = require('handlebars')
const LeagueStanding = require('../models/LeagueStanding')
const db = require('../_helpers/db')

/**
 * Displays a start page and snippets made by users.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.index = async function (req, res) {
    try{
        var table = await LeagueStanding.getTable()
        var seasons = await LeagueStanding.filterTableSeason()
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
    let valOfButtonClicked = req.body.value
    console.log(valOfButtonClicked)
    try{
        var tableUpdate = await LeagueStanding.getTable(valOfButtonClicked)
        var seasons = await LeagueStanding.filterTableSeason()
    }catch(err){
        console.log(err)
    }
    console.log(tableUpdate)
    res.locals.result = tableUpdate
    res.locals.seasons = seasons
    res.render('home/index');
    // This function will be called when a user clicks the button
    // valOfButtonClicked contains the value of the button clicked

    // Now you should whatever you like with the value in this function such as gather tables from database or whatever...
}

// Exports.
module.exports = homeController