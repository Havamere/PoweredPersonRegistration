var matches = [
	{name: 'Agent Hill', url: './images/Agent_Hill.jpg', id: '', powers: ['Aim Accuracy', 'Espionage']},
	{name: 'Black Panther', url: './images/Black_Panter.jpg', id: '', powers: ['Agility', 'Martial Arts']},
	{name: 'Black Widow', url: './images/Black_Widow.jpg', id: '', powers: ['Agility', 'Aim Accuracy', 'Espionage', 'Martial Arts']},
	{name: 'Captain America', url: './images/Captain_America.jpg', id: '', powers: ['']},
	{name: 'Daredevil', url: './images/Daredevil.jpg', id: '', powers: ['']}},
	{name: 'Doctor Strange', url: './images/Doctor_Strange.jpg', id: '', powers: ['']}},
	{name: 'Hawkeye', url: './images/Hawkeye.jpg', id: '', powers: ['']}},
	{name: 'Jean Grey', url: './images/Jean_Grey.jpg', id: '', powers: ['']}},
	{name: 'Jessica Jones', url: './images/Jessica_Jones.jpg', id: '', powers: ['']}},
	{name: 'Loki', url: './images/loki.jpg', id: '', powers: ['']}},
	{name: 'Powerman', url: './imagesPowerman.jpg', id: '', powers: ['']}},
	{name: 'Professor Xavier', url: './images/Professor_Xavier.jpg', id: '', powers: ['']}},
	{name: 'Punisher', url: './images/Punisher.jpg', id: '', powers: ['']}},
	{name: 'Quicksilver', url: './images/Quicksilver.jpg', id: '', powers: ['']}},
	{name: 'Scarlet Witch', url: './images/scarlet_witch.jpg', id: '', powers: ['']}},
	{name: 'Spiderman', url: './images/Spiderman.jpg', id: '', powers: ['']}},
	{name: 'Starlord', url: './images/Star_Lord.jpg', id: '', powers: ['']}},
	{name: 'Storm', url: './images/Storm.jpg', id: '', powers: ['']}},
	{name: 'Thor', url: './images/Thor.jpg', id: '', powers: ['']}},
	{name: 'Wolverine', url: './images/Wolverine.png', id: '', powers: ['']}}
]

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

//Create the provider object
var provider = new firebase.auth.FacebookAuthProvider();

//Adds profile photo album as additional scope.  We will need these for the user to pick from for the scan
provider.addScope('user_photos');
provider.addScope('user_location');


$('#signUp').click(function(){

	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
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
		  	alert(data.msg)
		  	window.location = data.url;
		  });
	  // ...
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

});

$('#signIn').click(function(){

	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
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
	  // ...
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

});

//||JavaScript for Scan page||\\
$(document).ready(function() {
	var user = JSON.parse(sessionStorage.getItem('user'));

	//for (var i = 0; i < array.length; i++) {}
	$('.profilePics').append("<img id='picture' src="+user.photo+" draggable='true' ondragstart='drag(event)'' width='200px' height='200px'>");

	$('#submit').on('click', function() {
		var userProfile = 
	});
});

//Sign-out Button
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});