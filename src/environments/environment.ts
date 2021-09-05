// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
      apiKey: "AIzaSyD9pRhCpZTVbp1UnYHl6U6TW5GuavYiRdU",
      authDomain: "angular-live-chat.firebaseapp.com",
      databaseURL: "https://angular-live-chat.firebaseio.com",
      projectId: "angular-live-chat",
      storageBucket: "angular-live-chat.appspot.com",
      messagingSenderId: "364755164354",
      appId: "1:364755164354:web:367189377e051d4cdeef5b"      
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
