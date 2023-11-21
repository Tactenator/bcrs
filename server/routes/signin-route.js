/******************************************************************************
 * Title: signin-route.js
 * Author: Group 1 - Trevor McLaurine, William Austin, Tiffany Reyes, Patrick Cuauro
 * Date: 11/20/2023
 * Description: Sign In Routes
 *****************************************************************************/

 //imports
 const express = require('express');
 const User = require('../models/user-model');
//  const bcrypt = require('bcryptjs');

const router = express.Router();
// const saltRounds = 10;

//Signin Method
router.post('/signin', async(req, res) => {

  try {
    const user = User.findOne({ 'email': req.body.email })
    if(!user) {
      res.status(500).json({'message': 'MongoDB Exception'})
    }
  }
  catch(error) {
    console.log(error)
    res.status(501).json({ 'message': `Server Exception: ${error.message}` })
  }
});