/*
============================================
; Title:  VerifyQuestionRequest.ts
; Author: Tiffany Reyes
; Date:   28 Nov 2023
; Description: Verify Question Request Model
;===========================================
*/

export interface VerifyQuestionRequest {
  question: string,
  questionId: string,
  answer: string,
  _id: string
}