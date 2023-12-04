/******************************************************************************
 * Title: signin-route.js
 * Author: Group 1 - Trevor McLaurine, William Austin, Tiffany Reyes, Patrick Cuauro
 * Date: 11/20/2023
 * Description: Sign In Routes
 *****************************************************************************/

const express = require('express')
const User = require('../models/user-model')
const Invoice = require('../models/invoice-model')
// const { mongo } = require("../utils/mongo");
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
router.post('/invoices/:email', async (req, res) => {

    try{
        const invoice = {
            email: req.params.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateCreated: req.body.dateCreated,
            partsAmount: req.body.partsAmount, 
            laborAmount: req.body.laborAmount, 
            lineItemTotal: req.body.lineItemTotal, 
            invoiceTotal: req.body.invoiceTotal, 
            orderDate: req.body.orderDate, 
            lineItems: req.body.lineItems
        }   
        

        const newInvoice = await Invoice.create(invoice)
        res.status(200).json(newInvoice)
        
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

    // try {
    //     mongo(async (db) => {
    //         const aggregationPipeline = [
    //           { $unwind: "$lineItems" },
    //           {
    //             $group: {
    //               _id: {
    //                 title: "$lineItems.title",
    //                 price: "$lineItems.price",
    //                 name: "$lineItems.name",
    //               },
    //               count: { $sum: 1 },
    //             },
    //           },
    //           { $sort: { "_id.title": 1 } },
    //         ];
      
    //         const result = await db
    //           .collection("invoices")
    //           .aggregate(aggregationPipeline)
    //           .toArray();
      
    //         res.status(200).json(result);
    //       });
    //     }
    //     catch(error) {
    //         res.status(500).send({ 'message': `Server Exception: ${error.message} `})
    //     }
    
})

module.exports = router;