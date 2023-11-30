import { AbstractControl, FormGroup } from '@angular/forms';

export function confirmPasswordValidator(group: FormGroup): {
  [key: string]: any;
} {
  const password = group.get('password').value;
  const confirmPassword = group.get('confirmPassword').value;

  if (password !== confirmPassword) {
    return {
      mismatchedPasswords: true,
    };
  }

  return null;
}
