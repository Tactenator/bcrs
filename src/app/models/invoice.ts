/*
============================================
; Title:  Invoice.ts
; Author: Tiffany Reyes
; Date:   04 Dec 2023
; Description: Invoice Model
;===========================================
*/

import { Service } from "./service";

export interface Invoice {
    _id?: string;
    email: string;
    firstName: string;
    lastName: string;
    lineItems : Service[];
    partsAmount?: string;
    laborAmount?: string;
    lineItemTotal: number;
    invoiceTotal: number;
    orderDate: Date;
}