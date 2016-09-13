//creates firebase configuration for data management
// var config = {
// 	apiKey: "AIzaSyB76GN2pXdeqIyw_y61bvdS5NuR8qR2wXw",
//     authDomain: "powered-persons-registration.firebaseapp.com",
//     databaseURL: "https://powered-persons-registration.firebaseio.com",
//     storageBucket: "powered-persons-registration.appspot.com",
// };

//Initiallizes firebase on the page
//firebase.initializeApp(config);

//Create the provider object *look at at window*
//var provider = new firebase.auth.FacebookAuthProvider();

//Adds profile photo album as additional scope.  We will need these for the user to pick from for the scan
//provider.addScope('user_photos');
//provider.addScope('user_location');
	// firebase.auth().signInWithPopup(provider).then(function(result) {
	//   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	//   var token = result.credential.accessToken;
	//   // The signed-in user info.
	//   var user = result.user;

	// //sign-in by redirect
	// // firebase.auth().getRedirectResult().then(function(result) {
	// // 	console.log("attempting log in")
	// //   if (result.credential) {
	// //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	// //     var token = result.credential.accessToken;
	// //     // ...
	// //   }
	//   // The signed-in user info.
	//   var user = result.user;
	//   console.log(user);

	//   var userName = result.user.displayName;
	//   //console.log(userName);

	//   var userEmail = result.user.email;

	//   var userPhoto = result.user.photoURL;

	//   var userLocation = result.user.location;

	//   //Creates a local storage spage for the user's info for the page's duration on the user's browser
	//   sessionStorage.setItem('user', JSON.stringify({user: userName, photo: userPhoto, location: userLocation}));
	  
	//   	$.ajax({
	// 	  method: "POST",
	// 	  url: "/signUp",
	// 	  data: {user: userName, email: userEmail, profilePic: userPhoto}
	// 	})
	// 	  .done(function( data ) {
	// 	  	if (data.error) {
	// 	  		alert(data.error);
	// 	  	}
	// 	  	alert(data.msg);
	// 	  	window.location = data.url;
	// 	  });

	// }).catch(function(error) {
	//   // Handle Errors here.
	//   var errorCode = error.code;
	//   var errorMessage = error.message;
	//   // The email of the user's account used.
	//   var email = error.email;
	//   // The firebase.auth.AuthCredential type that was used.
	//   var credential = error.credential;
	//   // ...
	// });

	// firebase.auth().signOut().then(function() {
	// 	  // Sign-out successful.
	// 	}, function(error) {
	// 	  // An error happened.
	// 	});