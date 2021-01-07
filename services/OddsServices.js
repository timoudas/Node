'use strict';
const { response } = require('express');
const { default: got } = require('got');
var axios = require('axios');
const keys = require('../configs/keys');
const { Collection } = require('mongoose');

module.exports = {
    getOdds
}

/**
 * 
 * @param {string} market: h2h, spreads, totals 
 */
async function reqOdds(market){
    const defaultMarket = 'h2h'
    var propertiesObj = {sport:'soccer_epl', region:'eu', 
        mkt:(market != undefined) ? defaultMarket : market,
        apiKey: keys.OddsApi};
        const response = await axios('https://api.the-odds-api.com/v3/odds/', {
            params: propertiesObj
        }).then(response => {

            console.log(
                `Successfully got ${response.data.data.length} sports.`,
                `Here's the first sport:`
            )
        
            return response.data.data.slice(0, 7)
            
        })
        .catch(error => {
            console.log('Error status', error.response.status)
            console.log(error.response.data)
        })
    }


async function getOdds(market){
    const data = await reqOdds(market)
    console.log(data)
}

const hello = await getOdds('h2h')
console.log(hello)
