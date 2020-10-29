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
    res.render('index');
}


// Exports.
module.exports = homeController