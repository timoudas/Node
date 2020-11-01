'use strict'

const express = require('express')
const router = express.Router()

const tableController = require('../controllers/tableController')

// GET /
router.get('/table', tableController.index)
router.get('/table/:id', tableController.index)
router.post('/table', tableController.handleSeasonFilter) // To be able to catch POST request we need a route that handles POST requests

// Exports.
module.exports = router