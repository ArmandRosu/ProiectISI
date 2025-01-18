// // import { Component, OnInit } from '@angular/core';
// // import { AuthService } from './services/auth.service';

// // @Component({
// //   selector: 'app-root',
// //   templateUrl: './app.component.html',
// //   styleUrls: ['./app.component.scss'],
// // })
// // export class AppComponent implements OnInit {
// //   tabs = [
// //     { name: 'Home', link: '/home' },
// //     { name: 'Map', link: '/map' },
// //   ];
// //   activeTab = this.tabs[0].link; // Inițializează cu primul tab
// //   authenticatedUser: string | null = null;

// //   constructor(private authService: AuthService) {}

// //   ngOnInit(): void {
// //     // Ascultă modificările email-ului utilizatorului autentificat
// //     this.authService.userEmail$.subscribe((email) => {
// //       this.authenticatedUser = email;
// //     });

// //     // Inițializează email-ul din localStorage
// //     const email = localStorage.getItem('email');
// //     if (email) {
// //       this.authService.setUserEmail(email);
// //     }
// //   }
// //   selectedIndex = 0;
// //   // authenticatedUser: string | null = localStorage.getItem('email');

// //   // Funcție care se declanșează la schimbarea tab-ului
// //   onTabChange(event: any) {
// //     console.log('Tab changed to:', event.index);
// //   }
// // }
// // import { Component, OnInit } from '@angular/core';
// // import { AuthService } from './services/auth.service';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-root',
// //   templateUrl: './app.component.html',
// //   styleUrls: ['./app.component.scss'],
// // })
// // export class AppComponent implements OnInit {
// //   tabs = [
// //     { name: 'Home', link: '/home' },
// //     { name: 'Map', link: '/map' },
// //   ];
// //   activeTab = this.tabs[0].link; // Inițializează cu primul tab
// //   authenticatedUser: string | null = null;

// //   constructor(private authService: AuthService, private router: Router) {}

// //   ngOnInit(): void {
// //     // Ascultă modificările email-ului utilizatorului autentificat
// //     this.authService.userEmail$.subscribe((email) => {
// //       this.authenticatedUser = email;
// //     });

// //     // Inițializează email-ul din localStorage
// //     const email = localStorage.getItem('email');
// //     if (email) {
// //       this.authService.setUserEmail(email);
// //     }
// //   }

// //   selectedIndex = 0;

// //   // Funcție care se declanșează la schimbarea tab-ului
// //   onTabChange(event: any) {
// //     console.log('Tab changed to:', event.index);
// //   }

// //   // Logout-ul utilizatorului
// //   logout() {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('email');
// //     this.authService.setUserEmail(null); // Resetează email-ul în AuthService
// //     this.authenticatedUser = null;
// //     this.router.navigate(['/login']); // Redirecționează la pagina de login
  
// //     setTimeout(() => {
// //       this.router.navigate(['/home']); // Redirecționează către Home
// //     }, 3000);
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from './services/auth.service';
// // import { Router } from '@angular/router';
// import { Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit {
//   // tabs = [
//   //   { name: 'Home', link: '/home' },
//   //   { name: 'Map', link: '/map' },
//   // ];
//   tabs: { name: string; link: string }[] = [];
//   activeTab = this.tabs[0].link;
//   authenticatedUser: string | null = null;
//   isLoggingOut: boolean = false; // Adaugă proprietatea
//   showMap = false; 

  
//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit(): void {
//     this.authService.userEmail$.subscribe((email) => {
//       this.authenticatedUser = email;
//       this.updateTabs();
//     });

//     const email = localStorage.getItem('email');
//     if (email) {
//       this.authService.setUserEmail(email);
//     }
//     this.updateTabs();
//     // this.router.events.subscribe((event) => {
//     //   if (event instanceof NavigationEnd) {
//     //     this.updateTabs();
//     //     this.showMap = event.url === '/map'; // Afișează harta doar pe pagina „Map”
//     //   }
//     // });
  
//   }
  
//   updateTabs() {
//     if (this.authenticatedUser) {
//       this.tabs = [
//         { name: 'User Home', link: '/user-home' },
//         { name: 'Map', link: '/map' },
//       ];
//     } else {
//       this.tabs = [{ name: 'Home', link: '/home' }];
//     }
//     if (!this.tabs || this.tabs.length === 0) {
//       console.error('Error: Tabs array is empty or not initialized.');
//     }
//   }

//   selectedIndex = 0;

//   onTabChange(event: any) {
//     const routes = ['/home', '/map'];
//     if (routes[event.index]) {
//       this.router.navigate([routes[event.index]]);
//     }
//     console.log('Tab changed to:', routes[event.index]);
//   }

//   logout() {
//     this.isLoggingOut = true; // Activează mesajul de logout
//     this.authService.setUserEmail(null);
//     localStorage.removeItem('email');
//     localStorage.removeItem('token');
//     this.authenticatedUser = null;

//     setTimeout(() => {
//       this.isLoggingOut = false;
//       this.router.navigate(['/home']);
//     }, 3000);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tabs: { name: string; link: string }[] = [];
  authenticatedUser: string | null = null;
  isLoggingOut: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Ascultăm modificările email-ului utilizatorului autentificat
    this.authService.userEmail$.subscribe((email) => {
      this.authenticatedUser = email;
      this.updateTabs(); // Actualizăm tab-urile
    });

    // Inițializăm email-ul din localStorage
    const email = localStorage.getItem('email');
    if (email) {
      this.authService.setUserEmail(email);
    }

    this.updateTabs(); // Asigurăm că tab-urile sunt inițializate corect
  }

  updateTabs() {
    if (this.authenticatedUser) {
      this.tabs = [
        { name: 'User Home', link: '/user-home' },
        { name: 'Map', link: '/map' },
      ];
    } else {
      this.tabs = [{ name: 'Home', link: '/home' }];
    }
  }

  logout() {
    this.isLoggingOut = true;
    this.authService.setUserEmail(null);
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.authenticatedUser = null;

    setTimeout(() => {
      this.isLoggingOut = false;
      this.router.navigate(['/home']);
    }, 3000);
  }
}
