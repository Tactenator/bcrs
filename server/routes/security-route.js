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

        const user = await User.findOne( { email } );

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            res.status(500).json({ message: 'Incorrect Password '})
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
  console.log(req.body);
  const { email, password, firstName, lastName, phoneNumber, address, securityQuestions } = req.body;

  if(!email || !password || !firstName || !lastName || !phoneNumber || !address || !securityQuestions)
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

  const user = await User.create({email, password: hash, firstName, lastName, phoneNumber, address, isDisabled: false, role: 'standard', selectedSecurityQuestions: securityQuestions})

  res.status(200).json(user)
}
catch(error) {
  res.status(400).json({ error: `${error.message}`})
}


});


//Verify Security Questions
/**
 * @swagger
 *
 * components:
 *   schemas:
 *     SubmittedAnswer:
 *       required:
 *         - _id
 *         - questionId
 *         - question
 *         - answer
 *       properties:
 *         _id:
 *           type: string
 *         questionId:
 *           type: string
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *     SubmittedAnswers:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/SubmittedAnswer"
 */

/**
 * VerifySecurityQuestions
 * @openapi
 * /api/security/{email}/verify-security-questions:
 *   post:
 *     tags:
 *       - Security
 *     name: VerifySecurityQuestions
 *     summary: Verifies security question answers
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Id of the user to verify.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The list of submitted answers
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SubmittedAnswers"
 *     responses:
 *       '200':
 *         description: Questions were all answered correctly
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/security/:email/verify-security-questions', async (req, res) => {
  try {
    //find user by email
    const user = await User.findOne({ 'email': req.params.email })

    //throw error if no email
    if(!user) {
      return res.status(500).json(' User not found or does not exist. ')
    }

    //grab questions from user, map to a question array
    const questions = user.selectedSecurityQuestions.map(e => {
      return {
        _id: e.id,
        question: e.question,
        questionId: e.questionId,
        answer: e.answer,
      }
    });

    const results = [];

    questions.forEach(question => {
      const submitted = req.body.find(q => q._id === question._id);

      //return 200 status for correct answer
      results.push(question.answer === submitted.answer)
    })



    if(results.every(result => result === true)) {
      return res.status(200).json("Correct")
    }
    else {
      //return 500 status if incorrect
      return res.status(500).json("Incorrect answers given.")
    }
  }
  catch(error) {
    res.status(400).json({ error: `${error.message}`})
  }
})

/**
 * ResetPassword
 * @openapi
 * /api/security/users/{email}/reset-password:
 *   post:
 *     tags:
 *       - Security
 *     name: ResetPassword
 *     summary: Resets a user's password
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Id of the user to verify.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Password to reset to
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User's password reset successfully
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/security/users/:email/reset-password', async (req, res) => {
  try {
    //searches for user
    const user = await User.findOne({ 'email': req.params.email })

    //throw error if no email
    if(!user) {
      return res.status(500).json(' User not found or does not exist. ')
    }

    //pulls new requested password from req.body
    const newPassword = req.body.password

    //hashes together new password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    //sets new password
    user.set({
      password: hash
    });
    await user.save();

    //returns user
    return res.status(200).json(user)
  }
  catch(error) {
    res.status(400).json({ error: `${error.message}`})
  }
})

/**
 * VerifyUser
 * @openapi
 * /api/security/verify/users/{email}/:
 *   post:
 *     tags:
 *       - Security
 *     name: VerifyUser
 *     summary: Verifies a user
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Email of the user to verify
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Email of the user
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User's verified successfully
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/security/verify/users/:email', async (req, res) => {
  try {
    //searches for user
    const user = await User.findOne({ 'email': req.params.email })

    //throw error if no email
    if(!user) {
      return res.status(500).json(' User not found or does not exist. ')
    }

    //returns user
    return res.status(200).json(user)
  }
  catch(error) {
    res.status(400).json({ error: `${error.message}`})
  }
})


module.exports = router;