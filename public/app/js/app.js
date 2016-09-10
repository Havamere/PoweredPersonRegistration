var matches = [
	{name: 'Agent Hill', url: './images/Agent_Hill.jpg', powers: ['Aim Accuracy', 'Espionage']},
	{name: 'Black Panther', url: './images/Black_Panter.jpg', powers: ['Agility', 'Martial Arts']},
	{name: 'Black Widow', url: './images/Black_Widow.jpg', powers: ['Agility', 'Aim Accuracy', 'Espionage', 'Martial Arts']},
	{name: 'Captain America', url: './images/Captain_America.jpg', powers: [ 'Agility', 'Aim Accuracy', 'Martial Arts', 'Regeneration', 'Stamina', 'Strength']},
	{name: 'Daredevil', url: './images/Daredevil.jpg', powers: ['Agility', 'Enhanced Senses', 'Martial Arts']},
	{name: 'Doctor Strange', url: './images/Doctor_Strange.jpg', powers: ['Flight', 'Magic']},
	{name: 'Hawkeye', url: './images/Hawkeye.jpg', powers: ['Agility', 'Aim Accuracy', 'Martial Arts', 'Strategist']},
	{name: 'Jean Grey', url: './images/Jean_Grey.jpg', powers: ['Telekenisis', 'Telepathy']},
	{name: 'Jessica Jones', url: './images/Jessica_Jones.jpg', powers: ['Endurance', 'Flight', 'Strength']},
	{name: 'Loki', url: './images/loki.jpg', powers: ['Magic', 'Strength']},
	{name: 'Powerman', url: './imagesPowerman.jpg', powers: ['Endurance', 'Invulnerability', 'Strength']},
	{name: 'Professor Xavier', url: './images/Professor_Xavier.jpg', powers: ['Mind Control', 'Telepathy']},
	{name: 'Punisher', url: './images/Punisher.jpg', powers: ['Aim Accuracy', 'Martial Arts', 'Strategist']},
	{name: 'Quicksilver', url: './images/Quicksilver.jpg', powers: ['Speed']},
	{name: 'Scarlet Witch', url: './images/scarlet_witch.jpg', powers: ['Flight', 'Magic']},
	{name: 'Spiderman', url: './images/Spiderman.jpg', powers: ['Agility', 'Enhanced Senses', 'Strength']},
	{name: 'Starlord', url: './images/Star_Lord.jpg', powers: ['Aim Accuracy', 'Luck', 'Strategist']},
	{name: 'Storm', url: './images/Storm.jpg', powers: ['Flight', 'Weather Control']},
	{name: 'Thor', url: './images/Thor.jpg', powers: ['Flight', 'Strength', 'Weather Control']},
	{name: 'Wolverine', url: './images/Wolverine.png', powers: ['Enhanced Senses', 'Martial Arts', 'Regeneration']}
];

//||General functions for index/sign-in page||\\

//creates firebase configuration for data management
var config = {
	apiKey: "AIzaSyB76GN2pXdeqIyw_y61bvdS5NuR8qR2wXw",
    authDomain: "powered-persons-registration.firebaseapp.com",
    databaseURL: "https://powered-persons-registration.firebaseio.com",
    storageBucket: "powered-persons-registration.appspot.com",
};

//Initiallizes firebase on the page
firebase.initializeApp(config);

//Create the provider object *look at at window*
var provider = new firebase.auth.FacebookAuthProvider();

//Adds profile photo album as additional scope.  We will need these for the user to pick from for the scan
provider.addScope('user_photos');
provider.addScope('user_location');


$('#signUp').click(function(){
	console.log("button clicked");
	//sign-in by redirect
	firebase.auth().getRedirectResult().then(function(result) {
		console.log("attempting log in")
	  if (result.credential) {
	    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	    var token = result.credential.accessToken;
	    // ...
	  }
	  // The signed-in user info.
	  var user = result.user;
	  console.log(user);

	  var userName = result.user.displayName;
	  //console.log(userName);

	  var userEmail = result.user.email;

	  var userPhoto = result.user.photoURL;

	  var userLocation = result.user.location;

	  //Creates a local storage spage for the user's info for the page's duration on the user's browser
	  sessionStorage.setItem('user', JSON.stringify({user: userName, photo: userPhoto, location: userLocation}));
	  
	  	$.ajax({
		  method: "POST",
		  url: "/signUp",
		  data: {user: userName, email: userEmail, profilePic: userPhoto}
		})
		  .done(function( data ) {
		  	if (data.error) {
		  		alert(data.error);
		  	}
		  	alert(data.msg);
		  	window.location = data.url;
		  });

	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});

	// firebase.auth().signInWithPopup(provider).then(function(result) {
	//   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	//   var token = result.credential.accessToken;
	//   // The signed-in user info.
	//   var user = result.user;


	//   // ...
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
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}, function(error) {
	  // An error happened.
});

$('#signIn').click(function(){
	console.log("button clicked");
	//sign-in by redirect
	firebase.auth().getRedirectResult().then(function(result) {
	  if (result.credential) {
	    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	    var token = result.credential.accessToken;
	    // ...
	  }
	  // The signed-in user info.
	  var user = result.user;
	  console.log(user);

	  var userName = result.user.displayName;
	  //console.log(userName);

	  var userEmail = result.user.email;

	  var userPhoto = result.user.photoURL;

	  var userLocation = result.user.location;

	  //Creates a local storage spage for the user's info for the page's duration on the user's browser
	  sessionStorage.setItem('user', JSON.stringify({user: userName, photo: userPhoto, location: userLocation}));
	  
	  	$.ajax({
		  method: "POST",
		  url: "/signIn",
		  data: {user: userName, email: userEmail, profilePic: userPhoto}
		})
		  .done(function( data ) {
		  	if (data.error) {
		  		alert(data.error);
		  	}
		  	alert(data.msg);
		  	window.location = data.url;
		  });
		  
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});

	// firebase.auth().signInWithPopup(provider).then(function(result) {
	//   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	//   var token = result.credential.accessToken;
	//   // The signed-in user info.
	//   var user = result.user;


	//   // ...
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
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}, function(error) {
	  // An error happened.
});
});

//Sign-out Button
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});