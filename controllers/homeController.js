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
    res.render('home/home');
}

module.exports = homeController