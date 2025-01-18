// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { environment } from '../../../environments/environment';
// import { AuthService } from '../../services/auth.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { FirebaseService } from '../../services/firebase';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   errorMessage: string = '';

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private authService: AuthService,
//     private firebaseService: FirebaseService
//   ) {}

//   login() {
//     const body = { email: this.email, password: this.password };

//     this.http.post(`${environment.apiUrl}/auth/login`, body).subscribe({
//       next: (response: any) => {
//         localStorage.setItem('token', response.token);
//         localStorage.setItem('email', this.email);

//         // Setează email-ul în AuthService
//         this.authService.setUserEmail(this.email);

//         this.firebaseService.connectToDatabase();
//         console.log('Firebase connected successfully');

//         // Redirecționează la pagina /map
//         this.router.navigate(['/user-home']);
//       },
//       error: (error) => {
//         this.errorMessage = 'Invalid login credentials';
//         console.error(error);
//       },
//     });
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Apelăm metoda login din AuthService
  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', this.email);

        // Actualizăm starea în AuthService
        this.authService.setUserEmail(this.email);

        // Redirecționăm către user-home
        this.router.navigate(['/user-home']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        console.error('Login failed:', error);
      },
    });
  }
}
