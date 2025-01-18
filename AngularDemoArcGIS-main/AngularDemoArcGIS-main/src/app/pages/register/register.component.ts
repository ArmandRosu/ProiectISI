import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // onRegister() {
  //   if (this.password !== this.confirmPassword) {
  //     this.errorMessage = 'Passwords do not match!';
  //     this.successMessage = '';
  //     return;
  //   }

  //   const payload = {
  //     email: this.email,
  //     password: this.password
  //   };

  //   console.log('Sending registration payload:', payload);

  //   this.http.post('http://localhost:8080/auth/register', payload).subscribe({
  //     next: (response) => {
  //       console.log('Registration successful:', response);
  //       this.successMessage = 'Registration successful! You can now login.';
  //       this.errorMessage = '';
  //       setTimeout(() => {
  //         this.router.navigate(['/login']);
  //       }, 1500); // Navighează la login după 1.5 secunde
  //     },
  //     error: (error) => {
  //       console.error('Registration error:', error);
  //       if (error.status === 0) {
  //         this.errorMessage = 'Cannot connect to server. Please try again later.';
  //       } else if (error.error && typeof error.error === 'string') {
  //         this.errorMessage = `Registration failed: ${error.error}`;
  //       } else if (error.error && error.error.message) {
  //         this.errorMessage = `Registration failed: ${error.error.message}`;
  //       } else {
  //         this.errorMessage = 'An unknown error occurred during registration.';
  //       }
  //       this.successMessage = '';
  //     }
  //   });
  // }
  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
  
    const payload = {
      email: this.email,
      password: this.password
    };
  
    this.http.post('http://localhost:8080/api/auth/register', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! You can now login.';
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = 'An unknown error occurred during registration.';
        this.successMessage = '';
      }
    });
  }
  
}