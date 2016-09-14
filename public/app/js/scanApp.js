//||JavaScript for Scan page||\\
$(document).ready(function() {
	var user = JSON.parse(sessionStorage.getItem('user'));
	var picture = JSON.parse(sessionStorage.getItem('picture'));

	console.log(user, picture);

	var fppPhotoURL = picture.photo.replace(/&/g, "%26");

	//for (var i = 0; i < array.length; i++) {}
	$('.profilePics').append("<img id='picture' src="+picture.photo+" draggable='true' ondragstart='drag(event)'' width='200px' height='200px'>");

	var key = '18465a9186327cab7d69e7d4e8daf163';
	var secret = 'XJHHBsWyjDxwT-lhvauBkg4GlA7UNCvi';
	var url = "https://apius.faceplusplus.com/v2/detection/detect?url="+fppPhotoURL+"&api_key="+key+"&api_secret="+secret+"&attribute=pose,gender,age,race";

	$('#submit').on('click', function() {
		$.ajax({
			method: 'POST',
			url: url,

		})
		.done(function( detectData ) {
			console.log(detectData);
			var head = detectData.face[0].attribute;
			var id = detectData.face[0].face_id;
			var newURL = "https://apius.faceplusplus.com/v2/detection/landmark?api_key="+key+"&api_secret="+secret+"&face_id="+id+"&type=83p";

			$.ajax({
				method: 'POST',
				url: newURL,
			})
			.done(function( landmarkData ) {
				console.log(landmarkData);
				var face = landmarkData.result[0].landmark;
				//if your pupils are set close together
				if ( (face.right_eye_pupil.x - face.left_eye_pupil.x <= 20) ){
					userProfile.powers.push('Aim Accuracy');
				};
				//if you have small eyes
				if ( (face.left_eye_right_corner.x - face.left_eye_left_corner.x < 7 ) && (face.right_eye_right_corner.x - face.right_eye_left_corner.x < 7) ){
					userProfile.powers.push('Agility');
				};
				//if you have a wide set jaw
				if ( (face.contour_right2.x - face.contour_left2.x > 45 ) ){
					userProfile.powers.push('Endurance');
				};
				//if you have wide set nostrils
				if ( (face.nose_right.x - face.nose_left.x > 14.1) ){
					userProfile.powers.push('Enhanced Senses');
				};
				//if you have a small width to your mouth
				if ( (face.mouth_right_corner.x - face.mouth_left_corner.x < 15) ){
					userProfile.powers.push('Espionage');
				};
				//if your pupils are set high on your face
				if ( (face.left_eye_pupil.y > 35 && face.left_eye_pupil.y < 40) && (face.right_eye_pupil.y > 35 && face.right_eye_pupil.x < 40) ){
					userProfile.powers.push('Flight');
				};
				//iff you have a wide chin
				if ( (face.contour_right9.x - face.contour_left9.x > 13) ){
					userProfile.powers.push('Invulnerability');
				};
				//if either of your eyebrows are raised higher than the other
				if ( (face.mouth_right_corner.y - face.mouth_left_corner.y > 5) || (face.mouth_left_corner.y - face.mouth_right_corner.y > 5) ){
					userProfile.powers.push('Luck');
				};
				//if you have high eyebrows
				if ( (face.left_eyebrow_upper_middle.y > 30) && (face.right_eyebrow_upper_middle.y > 30) ){
					userProfile.powers.push('Magic');
				};
				//I like this because it's relative to the face size, not based on a set number
				//if the middle width of the nose is relatively equadistant to the bottom of the nose (forming a near perfect triangle)
				if ( (Math.round(face.nose_contour_right2.x - face.nose_contour_left2.x) == Math.round(face.nose_contour_right2.y - face.nose_contour_lower_middle.y)) &&
					 (Math.round(face.nose_contour_right2.y - face.nose_contour_lower_middle.y) == Math.round(face.nose_contour_left2.y - face.nose_contour_lower_middle.y)) &&
					 (Math.round(face.nose_contour_left2.y - face.nose_contour_lower_middle.y) == Math.round(face.nose_contour_right2.x - face.nose_contour_left2.x)) ){
					userProfile.powers.push('Martial Arts');
				};
				//if the distance between your inner eye corners is greater than the width of the middle of your nose
				if ( (face.right_eye_left_corner.x - face.left_eye_right_corner.x) - (face.nose_contour_right2.x - face.nose_contour_left2.x) > 1 ){
					userProfile.powers.push('Mind Control');
				};
				//if the space from your chin to your lower lip is greater than the space from the top of your lip to the tip of your nose
				if ( (face.contour_chin.y - face.mouth_lower_lip_bottom.y) > (face.mouth_upper_lip_top.y - face.nose_tip.y) ){
					userProfile.powers.push('Regeneration');
				};
				//if width of nose is within 1.2 to 1.4 of width of either eye
				if ( ((face.nose_right.x - face.nose_left.x) - (face.right_eye_right_corner.x - face.right_eye_left_corner.x) > 1.2 ||
					  (face.nose_right.x - face.nose_left.x) - (face.right_eye_right_corner.x - face.right_eye_left_corner.x) < 1.4) ||
					 ((face.nose_right.x - face.nose_left.x) - (face.left_eye_right_corner.x - face.left_eye_left_corner.x) > 1.2 ||
					  (face.nose_right.x - face.nose_left.x) - (face.left_eye_right_corner.x - face.left_eye_left_corner.x) < 1.4) ){
					userProfile.powers.push('Speed');
				};
				//if width of chin is less than width of jaw / 1.8
				if ( ((face.contour_right8.x - face.contour_left8.x)*1.8) < (face.contour_right5.x - face.contour_left5.x) ){
					userProfile.powers.push('Stamina');
				};
				//if face pointing far enough left or right of center
				if ( (head.pose.yaw_angle.value > 20) || (head.pose.yaw_angle.value < (-20)) ){
					userProfile.powers.push('Strategist');
				};
				//if position of nose is near center of image 
				if ( (face.nose_tip.x > 50 && face.nose_tip.x < 55) && (face.nose_tip.y > 50 && face.nose_tip.y < 55) ){
					userProfile.powers.push('Strength');
				};
				//if age range is between 5 and 6
				if ( (head.age.range >= 5 || head.age.range <= 6) ){
					userProfile.powers.push('Telekenisis');
				};
				//if pitch value is negative
				if ( (head.pose.pitch_angle.value < 0) ){
					userProfile.powers.push('Telepathy');
				};
				//if mouth width is less than half of distance between nose tip and chin tip
				if ( ((face.mouth_right_corner.x - face.mouth_left_corner.x) *2 ) < (face.contour_chin.y - face.nose_tip.y) ){
					userProfile.powers.push('Weather Control');
				};
				$.ajax({
					method: 'POST',
					url: '/updatePowers',
					data: {userProfile: userProfile}
				})
				.done(function(updateData) {
					if (updateData.error) {
				  		alert(updateData.error);
				  	};
				  	sessionStorage.setItem('user', JSON.stringify({user: user.user, photo: picture.photo, powers: userProfile.powers, scores: userProfile.scores}));
				  	alert(updateData.msg);
				  	window.location = updateData.url;
				});
			});
		});
		var userProfile = {
			'user': user.user,
			'scores': [$('#q1').val(),$('#q2').val(),$('#q3').val(),$('#q4').val(),$('#q5').val(),$('#q6').val(),$('#q7').val()],
			'profile_pic': ''+fppPhotoURL+'',
			'powers': []
		};
		console.log(userProfile);
	});
});