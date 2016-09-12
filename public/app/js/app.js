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

	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;

	//sign-in by redirect
	// firebase.auth().getRedirectResult().then(function(result) {
	// 	console.log("attempting log in")
	//   if (result.credential) {
	//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	//     var token = result.credential.accessToken;
	//     // ...
	//   }
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

	firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}, function(error) {
		  // An error happened.
		});

});

$('#signIn').click(function(){
	console.log("button clicked");
	//Sign-in via pop-up
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;

	//sign-in by redirect
	// firebase.auth().getRedirectResult().then(function(result) {
	//   if (result.credential) {
	//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	//     var token = result.credential.accessToken;
	//     // ...
	//   }
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

	firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}, function(error) {
		  // An error happened.
		});
});

window.fbAsyncInit = function() {
    FB.init({
      appId      : '638211789673829',
      xfbml      : true,
      version    : 'v2.7'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

 // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

	  FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	  });

  };


  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }