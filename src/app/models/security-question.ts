/*
============================================
; Title:  SecurityQuestionResponse.ts
; Author: Tiffany Reyes
; Date:   28 Nov 2023
; Description: Security Question Response Model
;===========================================
*/

export interface SecurityQuestionResponse {
  question: string,
  questionId: string,
  _id: string
}

export interface SecurityQuestionRequest {
  question: string,
  answer: string
}