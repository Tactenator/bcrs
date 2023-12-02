/**
 * Title: reset-password.component.ts
 * Author: Tiffany R.
 * Date: 20 Nov 2023
 * Description: reset password component
 */

// importing class elements
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '../sign-in/sign-in.service';
import { MatStepper } from '@angular/material/stepper';
import { SecurityQuestionResponse } from 'src/app/models/security-question';
import { VerifyQuestionRequest } from 'src/app/models/verify-question';
import { ResetPasswordRequest } from 'src/app/models/reset-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  @ViewChild('resetPasswordStepper') resetPasswordStepper: MatStepper

  resetForm: FormGroup;
  apiError: string = '';

  questions: SecurityQuestionResponse[];
  email: string;
  questionsForm: FormGroup;

  passwordForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private signInService: SignInService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ]),
      ],
    });
    this.questionsForm = new FormGroup([]);
    this.passwordForm = this.fb.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });

  }
  get form() {
    return this.resetForm.controls;
  }

  onSubmit() {
    const formValues = this.resetForm.value;

    this.signInService.getSecurityQuestions(formValues.email).subscribe((questions) => {
      this.buildQuestionsForm(questions, formValues.email);
      this.apiError = '';
      this.resetPasswordStepper.next();
    },
    (err) => {
      console.log(err);
      this.apiError = 'Email not found.';
    });
  }

  verifyQuestions() {
    const formControls = this.questionsForm.controls;

    const questionRequests: VerifyQuestionRequest[] = [];

    for (const [_id, answerControl] of Object.entries(formControls)) {
      // console.log(`${_id}: ${answerControl}`);
      const originalQuestion = this.questions.find(q => q._id === _id);

      questionRequests.push({
        _id,
        questionId: originalQuestion.questionId,
        question: originalQuestion.question,
        answer: answerControl.value
      });
    }

    this.signInService.verifySecurityQuestions(this.email, questionRequests).subscribe((res) => {
      this.apiError = '';
      this.resetPasswordStepper.next();
    },
    (err) => {
      console.log(err);
      this.apiError = 'Invalid answer. NOTE: Answers are case-sensitive.';
    });
  }

  resetPassword() { // submit a reset password request to backend
    const formValues = this.passwordForm.value;
    // build request
    const request: ResetPasswordRequest = {
      password: formValues.password
    };

    this.signInService.resetPassword(this.email, request).subscribe((res) => {
      this.router.navigate(['/security/sign-in']);
    },
    (err) => {
      console.log(err);
    });
  }

  getEmailErrorMessage() { // email error msg
    const emailControl = this.resetForm.controls['email'];

    if (emailControl.hasError('required')) {
      return 'You must enter an email.';
    }

    return emailControl.hasError('email') ? 'Not a valid email.' : '';
  }

  getPasswordErrorMessage() { // password error msg
    const passwordControl = this.passwordForm.controls['password'];

    if (passwordControl.hasError('required')) {
      return 'You must enter a password.';
    }

    return '';
  }

  buildQuestionsForm(questions: SecurityQuestionResponse[], email: string) { // security question retrieval for mat-stepper
    this.questions = questions;
    this.email = email;
    const group: any = {};

    this.questions.forEach(question => {
      group[question._id] = new FormControl('', Validators.required);
    });

    this.questionsForm = this.fb.group(group);
  }

}
