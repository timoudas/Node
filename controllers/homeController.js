'use strict'

const homeController = {}
const ScheduleServices = require('../services/ScheduleService')
const TeamPlayersServices = require('../services/TeamPlayersService')


/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.index = async function (req, res) {
    res.locals.schedule = await ScheduleServices.getSchedule()
    res.locals.teams = await TeamPlayersServices.getTeams()
    res.locals.passes = await TeamPlayersServices.getKeyPassPlayers()
    res.locals.shots = await TeamPlayersServices.getBestShotPlayers()
    res.render('home/home');
}

module.exports = homeController