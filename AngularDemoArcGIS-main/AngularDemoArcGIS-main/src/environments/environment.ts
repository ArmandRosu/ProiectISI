// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'http://localhost:8080/api',
  firebase: {
    // add your Firebase config here 
    apiKey: "AIzaSyCzy47Pw9Nw9PlVOz789e1Z6gs17shJ76A",
    authDomain: "isi-bookmaps-project-c548d.firebaseapp.com",
    databaseURL: "https://isi-bookmaps-project-c548d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "isi-bookmaps-project-c548d",
    storageBucket: "isi-bookmaps-project-c548d.firebasestorage.app",
    messagingSenderId: "507651707637",
    appId: "1:507651707637:web:53068737f25f920b97ebbc"
  },
  production: false
};
// export const environment = {
//   production: false,
//   apiUrl: 'http://localhost:8080/api', // URL-ul backend-ului
// };


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
