'use strict'

const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController')

// GET /
router.get('/table', homeController.index)
router.post('/table', homeController.handleButtonClicked) // To be able to catch POST request we need a route that handles POST requests

// Exports.
module.exports = router