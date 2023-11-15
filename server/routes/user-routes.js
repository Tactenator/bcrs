/*
    ==================
    Title: user-routes.js,
    Author: Trevor McLaurine
    Date: 11/15/2023
    Description: User Routes 
*/

const express = require('express')
const User = require('../models/user-models')
const mongoose = require('mongoose')

const router = express.Router();

/**
 * createUser
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     name: createUsers
 *     summary: Creates a new user for the User API
 *     requestBody:
 *       description: Information about the user
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - position
 *               - empId
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               empId:
 *                 type: String
 *     responses:
 *       '200':
 *         description: Customer added to NodeShopper API
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/users', async (req,res) => {
    //Grabs information from the req.body function to initialize variables.
    const { email, password, firstName, lastName, phoneNumber, address, isDisabled, userId, role  } = req.body; 
    console.log(req.body)

    try{
        //creates a new customer. Checks to see if all parameters are met
        const newUser = await User.create({ email, password, firstName, lastName, phoneNumber, address, isDisabled, userId, role })
        if(!newUser){
            //if all parameters are not met, throws an error
            res.status(500).send( { 'message': `MongoDB Exception 501`})
        }
        else {
            //if successful, creates a new customer
            res.status(200).json(newUser);
        }
    }
    catch (error) {
        //if the request is bad, throws an error
        res.status(501).json({ 'message': `Server Exception: ${error.message}` })
    }
})

/**
 * findAllUsers
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a list of all users from the Users API database
 *     summary: Returns the data for all of the users
 *     operationid: findAllUsers
 *     responses:
 *       '200':
 *         description: "Successful retrieval of documents from the Users API"
 *       '500':
 *         description: "Server exceptions"
 *       '501':
 *         description: "MongoDB exceptions"
 */
router.get('/users', async (req,res) => {

    //Searches the database for all teams
    const users = await User.find({ })

    //returns the teams that are found
    res.status(200).json(users);
})

/**
 * findUserById
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a specific user designated by the user input. The user is retrieved by grabbing an id from the url parameters.
 *     summary: Returns the data for a specific user.
 *     operationid: findUserById
 *     responses:
 *       '200':
 *         description: "Successful retrieval of a document containing the user"
 *       '400':
 *         description: "Bad Request"
 *       '404':
 *         description: "Not Found"
 *       '500':
 *         description: "Server exceptions"
 */

router.get('/users/:userId', async (req, res) => {

    //searches for employee based on the id variable.
    const user = await User.findOne({ 'empId': req.params.userId })

    if(!user)
    {
        //if there is no employee with that id, returns status 404 and a message that employee can't be found
        return res.status(404).json({error: "No user can be found"});
    }
    //if successful, returns employee object
    res.status(200).json(employee);
})