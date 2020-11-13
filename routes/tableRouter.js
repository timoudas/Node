'use strict'

const express = require('express')
const router = express.Router()

const tableController = require('../controllers/tableController')

// GET
router.get('/', tableController.index)
// router.get('/:id', tableController.index)
router.post('/', tableController.handleFilters)
router.post('/update_data', tableController.updateData)

// Exports.
module.exports = router