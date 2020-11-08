'use strict'

const express = require('express')
const router = express.Router()

const tableController = require('../controllers/tableController')

// GET
router.get('/', tableController.index)
// router.get('/:id', tableController.index)
router.post('/', tableController.handleFilters)

// Exports.
module.exports = router