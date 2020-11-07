'use strict'

const express = require('express')
const router = express.Router()

const tableController = require('../controllers/tableController')

// GET
router.get('/table', tableController.index)
router.get('/table/:id', tableController.handleFilters)

// Exports.
module.exports = router