/*
============================================
; Title:  AddUserRequest.ts
; Author: Tiffany Reyes
; Date:   25 Nov 2023
; Description: Add User Request Model
;===========================================
*/

import { SecurityQuestionRequest } from "./security-question";

export interface AddUserRequest {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber?: string,
  address?: string,
  userId?: string,
  role?: string,
  securityQuestions?: SecurityQuestionRequest[]
}