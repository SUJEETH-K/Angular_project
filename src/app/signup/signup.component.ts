import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatSnackBarModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      this.authService.register(this.signupForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration failed', error);
          this.snackBar.open('Registration failed', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
    }
  }
}