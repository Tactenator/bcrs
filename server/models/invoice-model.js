/*
    ==================
    Title: invoice-model.js,
    Author: Trevor McLaurine
    Date: 12/4/2023
    Description: Initializes the invoice schema
*/

const { stringToKeyValue } = require('@angular/flex-layout/extended/style/style-transforms');
const mongoose = require('mongoose');

const lineItemsSchema = new mongoose.Schema({
    "name": {
        type: String
    },
    "price": {
        type: String
    }
})

const invoiceSchema = new mongoose.Schema({
    "email": {
        type: String
    },
    "firstName": {
        type: String
    },
    "lastName": {
        type: string
    },
    "lineItems": {
        type: [lineItemsSchema]
    },
    "partsAmount": {
        type: String
    },
    "laborAmount": {
        type: String
    },
    "lineItemTotal": {
        type: String
    },
    "invoiceTotal": {
        type: String
    },
    "orderDate": {
        type: String
    }
})

//exports the schema
module.exports = mongoose.model('Invoice', invoiceSchema);