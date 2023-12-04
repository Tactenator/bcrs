/******************************************************************************
 * Title: signin-route.js
 * Author: Group 1 - Trevor McLaurine, William Austin, Tiffany Reyes, Patrick Cuauro
 * Date: 11/20/2023
 * Description: Sign In Routes
 *****************************************************************************/

const express = require('express')
const User = require('../models/user-model')
const mongoose = require('mongoose')

const router = express.Router();

/**
 * createInvoice
 * @openapi
 * /api/invoices/{username}
 *   post:
 *     tags:
 *       - Invoice
 *     name: createInvoice
 *     summary: Creates a new invoice based on the username
 *     parameters:
 *      - name: userName
 *        in: path
 *        required: true
 *        description: Username that belongs to the invoice 
 *        schema: 
 *          type: string
 *     requestBody:
 *       description: Information about the person
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *               - fullName
 *               - partsAmount
 *               - laborAmount
 *               - lineItems
 *               - lineItemTotal
 *               - invoiceTotal
 *               - orderDate
 *             properties:
 *               email:
 *                 type: string
 *               fullName:
 *                 type: string
 *               dateCreated:
 *                 type: string
 *               partsAmount: 
 *                 type: string
 *               laborAmount: 
 *                 type: string
 *               lineItemTotal:
 *                 type: string
 *               invoiceTotal:
 *                 type: string
 *               orderDate: 
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: string
 *     responses:
 *       '200':
 *         description:  New invoice created
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/invoices/:username', async (req, res) => {

    try{
        // searches for a user based on the parameters written by the user
        const user = await User.findOne({ 'username': req.params.username })

        if(!user){
            // if no user is found, throws an error
            res.status(501).send({ 'message': 'MongoDB Exception'})
        }
        else
        {
            //if a user is found, a new invoice object is created and initialized with the req.body values
            const newInvoice = {
                email: req.body.subtotal,
                fullName: req.body.tax,
                dateCreated: req.body.dateCreated,
                partsAmount: req.body.partsAmount, 
                laborAmount: req.body.laborAmount, 
                lineItemTotal: req.body.lineItemTotal, 
                invoiceTotal: req.body.invoiceTotal, 
                orderDate: req.body.orderDate, 
                lineItems: req.body.lineItems
            }   
            // pushes the new object into an array already placed in the user's data
            user.invoices.push(newInvoice)
            
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

/**
 * findPurchasesByService
 * @openapi
 * /api/invoices/purchases-graph
 *   get:
 *     tags:
 *       - Invoice
 *     description: Returns the invoice based on service provided
 *     summary: Returns the invoices for the services
 *     operationid: findPurchasesByService
 *     responses:
 *       '200':
 *         description: "Successful retrieval of invoices"
 *       '500':
 *         description: "Server exceptions"
 *       '501':
 *         description: "MongoDB exceptions"
 */
router.get('/invoices/purchases-graph', async (req,res) => {

    try {
        //searches for a user in the database
        const customers = await Customers.findOne({ 'userName': req.params.userName })
        if(!customers){
            //if no user is found, throws an error
            res.status(501).send({ 'message': 'Mongo Exception Error'})
        }
        else
        {
            //if successful, sets status to 200 and returns the customer.
            res.status(200).json(customers); 
        }
    }
    catch(e) {
        //if unsuccessful, throws an error
        res.status(500).send({ 'message': `Server Exception: ${e.message}`})
    }
})

module.exports = router;