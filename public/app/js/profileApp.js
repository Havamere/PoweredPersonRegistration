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

var map;
var infoWindow;
var service;
var markers = [];
var latlong = {};
var haightAshbury = {};
var autocomplete;
var markerArr = [];


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
}

function initAutocomplete() {
    var center = {lat: 0, lng: 0};
    var map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 1,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      console.log(places);

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
}


$(document).ready(function() {
	var user = JSON.parse(sessionStorage.getItem('user'));

	console.log(user);

	var powers = user.powers;
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

	var volunteer = user.scores;
	var opportunities = ['Police', 'Fire Station', 'Red Cross', 'Youth Outreach', 'Charity', 'Habitat for Humanity'];

	for (var i = 0; i < volunteer.length; i++) {
		if (volunteer[i] > 3) {
			$('#localHero').append("<button class='btn btn-danger' value=\""+opportunities[i]+"\">"+opportunities[i]+"</button>");
		}
	}

	$('#profilePic').append("<img class='pull-right' src="+user.photo+" width='100px' height='100px'>");

	$('#userName').html(user.user);

	for (var i = 0; i < powers.length; i++) {
		$('#powers').append("<button class='btn btn-danger' value=\""+places[i]+"\">"+powers[i]+"</button>");
	}

	$('.btn').on('click', function(){
		var place = $(this).attr("value");
		console.log(place);
		var input = $('#pac-input');
		input.val().empty();
		input.val(input.val() + place);
		$('input').trigger({
		    type: 'keypress',
		    which: 13
		});
	});
});