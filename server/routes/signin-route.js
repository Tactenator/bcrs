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
router.post('/signin', async(req, res) => {

  const { email } = req.body;

    try {
        const user = await User.login( email );

        res.status(200).json({ email })
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
});

module.exports = router;