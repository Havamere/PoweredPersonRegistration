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

$(document).ready(function() {
	var user = JSON.parse(sessionStorage.getItem('user'));

	console.log(user);

	var powers = user.user.powers;
	var places = [];
	//Aim Accuracy, Agility, Endurance, Enhanced Senses, Espionage, Flight, Invulnerability, Luck, Magic, Martial Arts, Mind Control, Regeneration, Speed, Stamina, Strategist, Strength, Telekenisis, Telepathy, Weather Control
	for (var i = 0; i < powers.length; i++) {
		if (powers[i] == "Aim Accuracy") {
			places.push('gun range');
		}
		if (powers[i] == "Agility") {
			places.push('gymnastics');
		}
		if (powers[i] == "Endurance") {
			places.push('cross fit');
		}
		if (powers[i] == "Enhanced Senses") {
			places.push('restaurants');
		}
		if (powers[i] == "Espionage") {
			places.push('acting schools');
		}
		if (powers[i] == "Flight") {
			places.push('sky diving');
		}
		if (powers[i] == "Invulnerability") {
			places.push('boxing');
		}
		if (powers[i] == "Luck") {
			places.push('gambling');
		}
		if (powers[i] == "Magic") {
			places.push('magic shop');
		}
		if (powers[i] == "Martial Arts") {
			places.push('MMA');
		}
		if (powers[i] == "Mind Control") {
			places.push('magic show');
		}
		if (powers[i] == "Regeneration") {
			places.push('blood bank');
		}
		if (powers[i] == "Speed") {
			places.push('track and field');
		}
		if (powers[i] == "Stamina") {
			places.push('track and field');
		}
		if (powers[i] == "Strategist") {
			places.push('board games');
		}
		if (powers[i] == "Strength") {
			places.push('gym');
		}
		if (powers[i] == "Telekenisis") {
			places.push('magic show');
		}
		if (powers[i] == "Telepathy") {
			places.push('psychic');
		}
		if (powers[i] == "Weather Control") {
			places.push('weather station');
		}
	}

	$('#profilePic').append("<img class='pull-right' src="+user.user.profilePic+" width='100px' height='100px'>");
	$('#userName').html(user.user.user);
	for (var i = 0; i < powers.length; i++) {
		$('#powers').append("<button class='btn btn-danger' value="+places[i]+">"+powers[i]+"</button>");
	};

	var map;
		function initMap() {
	    	map = new google.maps.Map(document.getElementById('map'), {
	    	center: {lat: -34.397, lng: 150.644},
	    	zoom: 8
	    });
	}

	function initAutocomplete() {
	    // Create the autocomplete object, restricting the search to geographical
	    // location types.
	    autocomplete = new google.maps.places.Autocomplete(
	        /** @type {!HTMLInputElement} */
	        (document.getElementById('autocomplete')), { types: ['geocode'] });

	    // When the user selects an address from the dropdown, populate the address
	    // fields in the form.
	    autocomplete.addListener('place_changed', fillInAddress);
	}	
	
	// Bias the autocomplete object to the user's geographical location,
	// as supplied by the browser's 'navigator.geolocation' object.
	function geolocate() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(position) {
	            var geolocation = {
	                lat: position.coords.latitude,
	                lng: position.coords.longitude
	            };
	            var circle = new google.maps.Circle({
	                center: geolocation,
	                radius: position.coords.accuracy
	            });
	            autocomplete.setBounds(circle.getBounds());
	        });
	    }
	}

	// Bias the autocomplete object to the user's geographical location,
	// as supplied by the browser's 'navigator.geolocation' object.
	function geolocate() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(position) {
	            var geolocation = {
	                lat: position.coords.latitude,
	                lng: position.coords.longitude
	            };
	            var circle = new google.maps.Circle({
	                center: geolocation,
	                radius: position.coords.accuracy
	            });
	            autocomplete.setBounds(circle.getBounds());
	        });
	    }
	}
});