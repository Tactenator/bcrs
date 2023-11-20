/*
    ==================
    Title: user-model.js,
    Author: Trevor McLaurine
    Date: 11/15/2023
    Description: Initializes the user schema
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

const securityQuestionsSchema = new mongoose.Schema({
    "questionText" : {
        type: String
    }, 
    "answerText": {
        type: String
    }
})

//initializes the Schema
const userSchema = new mongoose.Schema({
    "email":
    {
        type: String,
    },
    "password":
    {
        type: String,
    },
    "firstName": {
        type: String
    }, 
    "lastName": {
        type: String
    }, 
    "phoneNumber": {
        type: String
    }, 
    "address": {
        type: String
    }, 
    "isDisabled": {
        type: Boolean
    }, 
    "userId": {
        type: String
    },
    "role": {
        type: String
    }, 
    "selectedSecurityQuestions": {
        type: [securityQuestionsSchema]
    }, 
    "invoice": {
        type: [invoiceSchema]
    }
});

//exports the schema
module.exports = mongoose.model('User', userSchema);