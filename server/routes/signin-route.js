/******************************************************************************
 * Title: signin-route.js
 * Author: Group 1 - Trevor McLaurine, William Austin, Tiffany Reyes, Patrick Cuauro
 * Date: 11/20/2023
 * Description: Sign In Routes
 *****************************************************************************/

 //imports
 const express = require('express');
 const User = require('../models/user-model');

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

        if (user.password === password) {
          res.status(200).json(user);
        }
        else {
          throw new Error('Invalid email or password.');
        }
    }
    catch (error){
        res.status(400).json({error: error.message});
    }
});

module.exports = router;