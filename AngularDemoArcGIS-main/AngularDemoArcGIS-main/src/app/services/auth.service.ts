// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private userEmailSubject = new BehaviorSubject<string | null>(null);
//   userEmail$ = this.userEmailSubject.asObservable();

//   setUserEmail(email: string | null): void {
//     this.userEmailSubject.next(email);
//   }

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('email'); // Verifică dacă email-ul este în localStorage
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userEmailSubject = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmailSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Setăm email-ul utilizatorului
  setUserEmail(email: string | null): void {
    this.userEmailSubject.next(email);
  }

  // Verificăm dacă utilizatorul este autentificat
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Metoda pentru login
  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(`${environment.apiUrl}/auth/login`, payload);
  }

  // Metoda pentru logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.setUserEmail(null);
    this.router.navigate(['/home']);
  }
}

