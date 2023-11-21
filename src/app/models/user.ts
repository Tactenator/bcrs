/*
============================================
; Title:  User.ts
; Author: Tiffany Reyes
; Date:   21 Nov 2023
; Description: User Model
;===========================================
*/

export interface User {
  userId: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  address: string,
  isDisabled: boolean,
  role: string,
  selectedSecurityQuestions?: {
    questionText: string,
    answerText: string
  } []
}