/******************************************************************************
 * Title: signin-route.js
 * Author: Group 1 - Trevor McLaurine, William Austin, Tiffany Reyes, Patrick Cuauro
 * Date: 11/20/2023
 * Description: Sign In Routes
 *****************************************************************************/

 //imports
 const express = require('express');
 const User = require('../models/user-model');
 const bcrypt = require('bcryptjs');
 const router = express.Router();

//Signin Method
/**
 * Signin
 * @openapi
 * /api/signin:
 *   post:
 *     tags:
 *       - Security
 *     name: Signin
 *     summary: Signin a user with provided credentials
 *     requestBody:
 *       description: Information about the user
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/signin', async(req, res) => {

  const { email, password } = req.body;

    try {
        const user = await User.findOne( {email} );

        const match = await bcrypt.compare(password, user.password)

        if(!match){
            throw Error('Incorrect password')
        }
        else 
        {
          res.status(200).json(user);
        }
    }
    catch (error){
        res.status(400).json({error: error.message});
    }
});


//Registration method
/**
 * Register
 * @openapi
 * /api/security/register:
 *   post:
 *     tags:
 *       - Security
 *     name: Register
 *     summary: Register a user with provided credentials and add to user API
 *     requestBody:
 *       description: Information about the user
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - address
 *               - isDisabled
 *               - userId
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber: 
 *                 type: string
 *               address: 
 *                 type: string
 *               isDisabled:
 *                 type: boolean
 *               userId: 
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful registration
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/security/register', async (req, res) => {
  
try {
  const { email, password, firstName, lastName, phoneNumber, address, isDisabled, userId, role } = req.body; 

  if(!email || !password || !firstName || !lastName || !phoneNumber || !address || !userId || !role)
  {
      return res.status(401).json({ error: 'All fields required'})
  }

  const exists = await User.findOne({ email })

  if(exists)
  {
    return res.status(500).json({ error: 'Email already exists'}) 
  }

  const salt = await bcrypt.genSalt(10); 
  const hash = await bcrypt.hash(password, salt)

  const user = await User.create({email, password: hash, firstName, lastName, phoneNumber, address, isDisabled, userId, role })

  res.status(200).json(user)
}
catch(error) {
  res.status(400).json({ error: `${error.message}`})
}
   

});



//Verify Security Questions
/**
 * VeryifySecurityQuestions
 * @openapi
 * /api/security/verify/users/:email/security-questions:
 *   post:
 *     tags:
 *       - Security
 *     name: VerifySecurityQuestions
 *     summary: Verifies security question answers
 *     requestBody:
 *       description: Question ID and the answer
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - questionId
 *               - answer
 *             properties:
 *               questionId:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Correct Answer
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/security/verify/users/:email/security-questions', async (req, res) => {
  try {
    //find user by email
    const user = await User.findOne({ 'email': req.params.email })
    
    //throw error if no email
    if(!user) { 
      return res.status(500).json(' User not found or does not exist. ')
    }
    
    //grab questions from user
    const questions = user.selectedSecurityQuestions;

    //find question that is being asked based on a question ID 
    const question = questions.find(e => e.questionId === req.body.questionId )
    
    //return 200 status for correct answer
    if(question.answer === req.body.answer) {
      return res.status(200).json("Correct") 
    }

    //return 500 status if incorrect
    return res.status(500).json("Incorrect answer given. ")
  }
  catch(error) {
    res.status(400).json({ error: `${error.message}`})
  }
})


module.exports = router;