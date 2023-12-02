/*
    ==================
    Title: user-routes.js,
    Author: Trevor McLaurine
    Date: 11/15/2023
    Description: User Routes
*/

const express = require('express')
const User = require('../models/user-model')
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
 *     summary: Creates a new user for the BCRS API
 *     requestBody:
 *       description: Information about the user
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: String
 *               password:
 *                 type: String
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: String
 *               userId:
 *                 type: String
 *               role:
 *                 type: String
 *     responses:
 *       '201':
 *         description: Successful creation of a user
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/users', async (req,res) => {
    //Grabs information from the req.body function to initialize variables.
    console.log(req.body)
    const { email, password, firstName, lastName, phoneNumber, address, userId, role  } = req.body;

    try{
        //creates a new customer. Checks to see if all parameters are met
        const newUser = await User.create({ email, password, firstName, lastName, phoneNumber, address, isDisabled: false, userId, role: 'standard' })
        if(!newUser){
            //if all parameters are not met, throws an error
            res.status(500).send( { 'message': `MongoDB Exception 501`})
        }
        else {
            //if successful, creates a new customer
            res.status(201).json(newUser);
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
 *     description: Returns a list of all users from the BCRS API database
 *     summary: Returns the data for all of the users
 *     operationid: findAllUsers
 *     responses:
 *       '200':
 *         description: "Successful retrieval of documents from the BCRS API"
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
 * /api/users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a specific user designated by the user input. The user is retrieved by grabbing an id from the url parameters.
 *     summary: Returns the data for a specific user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Id of the user to update.
 *         schema:
 *           type: string
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

    //searches for user based on the id variable.
    const user = await User.findOne({ 'userId': req.params.userId })

    if(!user)
    {
        //if there is no user with that id, returns status 404 and a message that user can't be found
        return res.status(404).json({error: "No user can be found"});
    }
    //if successful, returns user object
    res.status(200).json(user);
})

/**
 * updateUser
 * @openapi
 * /api/users/{userId}/:
 *   put:
 *     tags:
 *       - Users
 *     name: updateUser
 *     description: Updates an existing user document
 *     summary: Updates the information of tasks of an employee
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Id of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Employee information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - password
 *               - phoneNumber
 *               - address
 *               - isDisabled
 *               - userId
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               isDisabled:
 *                 type: string
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '204':
 *         description: User updated
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.put('/users/:userId', async (req, res) => {
    try{
        //Searches for user from the user database
        const user = await User.findOne({ 'email': req.params.email });
        //if no user exists, throws an error
        if(!user){
            res.status(401).json({ error: 'Invalid user Id'})
        }
        else {
            //otherwise, sets the new user data
            user.set({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                isDisabled: req.body.isDisabled,
                userId: req.body.userId,
                role: req.body.role
            })

            //saves the new user data to the database
            user.save()
            res.status(200).json(user)
        }
    }
    catch (error) {
        //throws an error if something goes wrong
        res.status(500).json({ error: error.message })
    }
});

/**
 * deleteUser
 * @openapi
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete a user by ID for a specific user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted the user.
 *       400:
 *         description: Bad request. Invalid input or missing parameters.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

// Delete a user by id only if is needed, the requirement is to disable the user
router.delete("/users/:userId", async (req, res, next) => {
  try{
    //Searches for user from the user database
    const user = await User.findOne({ userId: req.params.userId })
    //if no user exists, throws an error
    if(!user){
      res.status(404).json({ error: 'Not Found.'})
    }
    else {
        //otherwise, sets the new user data
        user.set({
          isDisabled: true,
        })

        //saves the new user data to the database
        user.save()
        res.status(204).json()
    }
  }
  catch (error) {
      //throws an error if something goes wrong
      res.status(500).json({ error: error.message })
  }
});

/**
 * getSecurityQuestions
 * @openapi
 * /api/users/{email}/security-questions:
 *   get:
 *     tags:
 *       - Users
 *     name: GetSecurityQuestions
 *     summary: Get's a users security questions
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Id of the user to update.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "Successful retrieval of users security questions"
 *       '400':
 *         description: "Bad Request"
 *       '404':
 *         description: "Not Found"
 *       '500':
 *         description: "Server exceptions"
 */
router.get('/users/:email/security-questions', async (req, res) => {
  console.log(req.params.email);
  //searches for user based on the id variable.
  const user = await User.findOne({ email: req.params.email })

  if(!user)
  {
      //if there is no user with that id, returns status 404 and a message that user can't be found
      return res.status(404).json({error: "No user can be found"});
  }

  //if successful, returns user object
  res.status(200).json(user.selectedSecurityQuestions.map(selection => {
    return {
      question: selection.question,
      questionId: selection.questionId,
      _id: selection.id
    }
  }));
})

//temporary route to add a security question
router.post('/users/:email/security-questions', async (req, res) => {

    try{
        // searches for a user based on the parameters written by the user
        console.log(req.body)
        const user = await User.findOne({ 'email': req.params.email })
        if(!user){
            // if no user is found, throws an error
            res.status(501).send({ 'message': 'MongoDB Exception'})
        }
        else
        {
            //if a user is found, a new invoice object is created and initialized with the req.body values
            const newQuestion = {
                question: req.body.question,
                answer: req.body.answer,
                questionId: req.body.questionId
            }

            user.selectedSecurityQuestions.push(newQuestion)

            //saves the new data to the database
            user.save()
            res.status(200).json(user)
        }
    }
    catch (error) {
        //if unsuccessful, throws an error
        res.status(500).send({ 'message': `Server Exception: ${error.message} `})
    }
})

module.exports = router;