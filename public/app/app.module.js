'use strict';

// Define the `powered-persons` module
angular.module('powered-persons', [
  // ...which depends on this list of modules	
  'ui.router',
  'firebase',
]);

// // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyB76GN2pXdeqIyw_y61bvdS5NuR8qR2wXw",
//     authDomain: "powered-persons-registration.firebaseapp.com",
//     databaseURL: "https://powered-persons-registration.firebaseio.com",
//     storageBucket: "",
//   };
//   firebase.initializeApp(config);