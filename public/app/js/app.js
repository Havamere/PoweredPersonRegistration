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

	console.log(user.photo);

	var fppPhotoURL = user.photo.replace(/&/g, "%26");

	//for (var i = 0; i < array.length; i++) {}
	$('.profilePics').append("<img id='picture' src="+user.photo+" draggable='true' ondragstart='drag(event)'' width='200px' height='200px'>");

	var key = '18465a9186327cab7d69e7d4e8daf163';
	var secret = 'XJHHBsWyjDxwT-lhvauBkg4GlA7UNCvi';
	var url = "https://apius.faceplusplus.com/v2/detection/detect?url="+fppPhotoURL+"&api_key="+key+"&api_secret="+secret+"&attribute=pose,gender,age,race";

	$('#submit').on('click', function() {
		$.ajax({
			method: 'POST',
			url: url,

		}).done(function( detectData ) {
			console.log(detectData);
			var head = detectData.face[0].attribute;
			var id = detectData.face[0].face_id;
			var newURL = "https://apius.faceplusplus.com/v2/detection/landmark?api_key="+key+"&api_secret="+secret+"&face_id="+id+"&type=83p";

			$.ajax({
				method: 'POST',
				url: newURL,
			}).done(function( landmarkData ){
				console.log(landmarkData);
				var face = landmarkData.result[0].landmark;
				//*agility, *aim accuracy, *endurance, *enhanced senses, *espionage, *flight, *invulnerability, *luck, *magic, *martial arts, 
				//*mind control, *regeneration, *speed, *stamina, *strategist, *strength, telekenisis, telepathy, *weather control
				if ( (face.right_eye_pupil.x - face.left_eye_pupil.x <= 20) ){
					userProfile.powers.push('Aim Accuracy');
				}
				if ( (face.left_eye_right_corner.x - face.left_eye_left_corner.x < 7 ) && (face.right_eye_right_corner.x - face.right_eye_left_corner.x < 7) ){
					userProfile.powers.push('Agility');
				}
				if ( (face.contour_right2.x - face.contour_left2.x > 45 ) ){
					userProfile.powers.push('Endurance');
				}
				if ( (face.nose_right.x - face.nose_left.x > 14.1) ){
					userProfile.powers.push('Enhanced Senses');
				}
				if ( (face.mouth_right_corner.x - face.mouth_left_corner.x < 15) ){
					userProfile.powers.push('Espionage');
				}
				if ( (face.left_eye_pupil.y > 35 && face.left_eye_pupil.y < 40) && (face.right_eye_pupil.y > 35 && face.right_eye_pupil.x < 40) ){
					userProfile.powers.push('Flight');
				}
				if ( (face.contour_right9.x - face.contour_left9.x > 13) ){
					userProfile.powers.push('Invulnerability');
				}
				if ( (face.mouth_right_corner.y - face.mouth_left_corner.y > 5) || (face.mouth_left_corner.y - face.mouth_right_corner.y > 5) ){
					userProfile.powers.push('Luck');
				}
				if ( (face.left_eyebrow_upper_middle.y > 30) && (face.right_eyebrow_upper_middle.y > 30) ){
					userProfile.powers.push('Magic');
				}
				//I like this because it's relative to the face size, not based on a set number
				//if the middle width of the nose is relatively equadistant to the bottom of the nose (forming a near perfect triangle)
				if ( (Math.round(face.nose_contour_right2.x - face.nose_contour_left2.x) == Math.round(face.nose_contour_right2.y - face.nose_contour_lower_middle.y)) &&
					 (Math.round(face.nose_contour_right2.y - face.nose_contour_lower_middle.y) == Math.round(face.nose_contour_left2.y - face.nose_contour_lower_middle.y)) &&
					 (Math.round(face.nose_contour_left2.y - face.nose_contour_lower_middle.y) == Math.round(face.nose_contour_right2.x - face.nose_contour_left2.x)) ){
					userProfile.powers.push('Martial Arts');
				}
				if ( (face.right_eye_left_corner.x - face.left_eye_right_corner.x) - (face.nose_contour_right2.x - face.nose_contour_left2.x) > 1 ){
					userProfile.powers.push('Mind Control');
				}
				if ( (face.contour_chin.y - face.mouth_lower_lip_bottom.y) > (face.mouth_upper_lip_top.y - face.nose_tip.y) ){
					userProfile.powers.push('Regeneration');
				}
				//if width of nose is within 1.2 to 1.4 of width of either eye
				if ( ((face.nose_right.x - face.nose_left.x) - (face.right_eye_right_corner.x - face.right_eye_left_corner.x) > 1.2 ||
					  (face.nose_right.x - face.nose_left.x) - (face.right_eye_right_corner.x - face.right_eye_left_corner.x) < 1.4) ||
					 ((face.nose_right.x - face.nose_left.x) - (face.left_eye_right_corner.x - face.left_eye_left_corner.x) > 1.2 ||
					  (face.nose_right.x - face.nose_left.x) - (face.left_eye_right_corner.x - face.left_eye_left_corner.x) < 1.4) ){
					userProfile.powers.push('Speed');
				} 
				//if width of chin is less than width of jaw / 1.8
				if ( ((face.contour_right8.x - face.contour_left8.x)*1.8) < (face.contour_right5.x - face.contour_left5.x) ){
					userProfile.powers.push('Stamina');
				}
				//if face pointing far enough left or right of center
				if ( (head.pose.yaw_angle.value > 20) || (head.pose.yaw_angle.value < (-20)) ){
					userProfile.powers.push('Strategist');
				}
				//if position of nose is near center of image 
				if ( (face.nose_tip.x > 50 && face.nose_tip.x < 55) && (face.nose_tip.y > 50 && face.nose_tip.y < 55) ){
					userProfile.powers.push('Strength');
				}
				//if age range is between 5 and 6
				if ( (head.age.range >= 5 || head.age.range <= 6) ){
					userProfile.powers.push('Telekenisis');
				}
				//if pitch value is negative
				if ( (head.pose.pitch_angle.value < 0) ){
					userProfile.powers.push('Telepathy');
				}
				//if mouth width is less than half of distance between nose tip and chin tip
				if ( ((face.mouth_right_corner.x - face.mouth_left_corner.x) *2 ) < (face.contour_chin.y - face.nose_tip.y) ){
					userProfile.powers.push('Weather Control');
				}
				$.ajax({
					method: 'POST',
					url: '/update',
					data: {user: userName, userProfile: userProfile}

				}).done(function(updateData) {
					if (updateData.error) {
				  		alert(updateData.error);
				  	}
				  	alert(updateData.msg);
				  	window.location = updateData.url;
				  });
				});
			});
		});
		var userProfile = {
			'scores': [$('#q1').val(),$('#q2').val(),$('#q3').val(),$('#q4').val(),$('#q5').val(),$('#q6').val(),$('#q7').val()],
			'profile_pic': ''+fppPhotoURL+'',
			'powers': []
		};
		console.log(userProfile);
	});
});

//Sign-out Button
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});