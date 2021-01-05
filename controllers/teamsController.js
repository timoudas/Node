'use strict'

const TeamsController = {}


/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
TeamsController.index = async function (req, res) {

    res.render('teams/teamsindex');
}

module.exports = TeamsController