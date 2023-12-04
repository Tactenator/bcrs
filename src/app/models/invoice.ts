/*
============================================
; Title:  Invoice.ts
; Author: Tiffany Reyes
; Date:   04 Dec 2023
; Description: Invoice Model
;===========================================
*/
export interface Invoice {
    _id?: string;
    username: string;
    userId: string;
    services : Array<any>;
}