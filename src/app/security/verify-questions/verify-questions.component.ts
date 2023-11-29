import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityQuestionResponse } from 'src/app/models/security-question';
import { VerifyQuestionRequest } from 'src/app/models/verify-question';
import { SignInService } from '../sign-in/sign-in.service';

@Component({
  selector: 'app-verify-questions',
  templateUrl: './verify-questions.component.html',
  styleUrls: ['./verify-questions.component.css']
})
export class VerifyQuestionsComponent implements OnInit {
  questions: SecurityQuestionResponse[];
  email: string;

  questionsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private signInService: SignInService
  ) {}

  ngOnInit(): void {
    this.questions = JSON.parse(this.route.snapshot.paramMap.get('questions'));
    this.email = this.route.snapshot.paramMap.get('email');

    const group: any = {};

    this.questions.forEach(question => {
      group[question._id] = new FormControl('', Validators.required);
    });
    this.questionsForm = new FormGroup(group);
  }

  get form() {
    return this.questionsForm.controls;
  }

  onSubmit() {
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

    this.signInService.verifySecurityQuestions(this.email, questionRequests).subscribe({
      next: (res) => {
        console.log(res);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
