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

router.post('/register', async (req, res) => {

  const { email, password, firstName, lastName, phoneNumber, address, isDisabled, userId, role } = req.body; 

  if(!username || !firstName || !lastName || !email || !password || phoneNumber || address || isDisabled || userId || role)
  {
      throw Error('All fields are required.')
  }

  const exists = await this.findOne({ email })

  if(exists)
  {
      throw Error('Email already in use.'); 
  }

  // mypassword
  const salt = await bcrypt.genSalt(10); 
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({username, firstName, lastName, email, password: hash })

  return user; 

});

module.exports = router;