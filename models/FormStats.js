const mongoose = require('mongoose')

var FormStatsSchema = new mongoose.Schema({
    teamName: {
        type: String
    },
    teamId: {
        type: Number
    },
    seasonId: {
        type: Number
    },
    seasonLabel:{
        type: String
    },
    form:{
        type: Array
    }
}, 
{ collection : 'form_stats' });

var FormStatsModel = mongoose.model('form_stats', FormStatsSchema);

module.exports = {FormStatsModel}