/*
    ==================
    Title: user-model.js,
    Author: Trevor McLaurine
    Date: 11/15/2023
    Description: Initializes the user schema
*/

const mongoose = require('mongoose');


const securityQuestionsSchema = new mongoose.Schema({
    "question" : {
        type: String
    },
    "answer": {
        type: String
    }, 
    "questionId": {
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
    }
});

//exports the schema
module.exports = mongoose.model('User', userSchema);