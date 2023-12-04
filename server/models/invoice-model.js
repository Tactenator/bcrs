/*
    ==================
    Title: invoice-model.js,
    Author: Trevor McLaurine
    Date: 12/4/2023
    Description: Initializes the invoice schema
*/

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
    "fullName": {
        type: String
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