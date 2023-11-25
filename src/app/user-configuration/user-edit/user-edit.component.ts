/**
 * Title: user-edit.component.ts
 * Author: Tiffany Reyes
 * Date: 25 Nov 2023
 * Description: user edit component
 */

// importing class elements
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  user: User;
  updateUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser(this.route.snapshot.paramMap.get('userId'));
    this.updateUserForm = this.fb.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      address: [this.user.address],
      phone: [this.user.phoneNumber],
    });
  }

  updateTask() {
    // const employeeId = this.cookieService.get('empId');
    // const formValues = this.updateTaskForm.value;

    // const task: Task = {
    //   taskId: this.data.task.taskId,
    //   employeeId: this.data.task.employeeId,
    //   description: formValues.description,
    //   status: this.data.task.status
    // };

    // this.employeesService.updateTaskByEmployeeId(employeeId, task)
    //   .subscribe(() => {
    //     this.dialogRef.close(task);
    //   });
  }
}
