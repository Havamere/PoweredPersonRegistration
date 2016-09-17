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

$(document).ready(function() {

	function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
	      center: {lat: 28.538, lng: -81.379},
	      zoom: 6
	    });
	    var infoWindow = new google.maps.InfoWindow({map: map});

	    // Try HTML5 geolocation.
	    if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition(function(position) {
	        var pos = {
	          lat: position.coords.latitude,
	          lng: position.coords.longitude
	        };

	        infoWindow.setPosition(pos);
	        infoWindow.setContent('Location found.');
	        map.setCenter(pos);
	      }, function() {
	        handleLocationError(true, infoWindow, map.getCenter());
	      });
	    } else {
	      // Browser doesn't support Geolocation
	      handleLocationError(false, infoWindow, map.getCenter());
	    }
	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	        infoWindow.setPosition(pos);
	        infoWindow.setContent(browserHasGeolocation ?
	                              'Error: The Geolocation service failed.' :
	                              'Error: Your browser doesn\'t support geolocation.');
	}

	function initAutocomplete() {
	    var map = new google.maps.Map(document.getElementById('map'), {
	      center: {lat: -33.8688, lng: 151.2195},
	      zoom: 13,
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

	// Adds a marker to the map and push to the array.
	function addMarker(location) {
	    var marker = new google.maps.Marker({
	        position: location,
	        map: map
	    });
	    markers.push(marker);
	    console.log(markers);
	}

	// Sets the map on all markers in the array.
	function setMapOnAll(map) {
	    for (var i = 0; i < markers.length; i++) {
	        markers[i].setMap(map);
	    }
	}

	// Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
	    setMapOnAll(null);
	}

	// Deletes all markers in the array by removing references to them.
	function deleteMarkers() {
	    clearMarkers();
	    markers = [];
	}

	// Shows any markers currently in the array.
	function showMarkers() {
	    setMapOnAll(map);
	}

	function newResults() {
	    console.log(typeof(markerArr));
	    console.log(markerArr);

	    //Refreshes the map results div with the new information
	    $("#list2").empty();

	    if (markerArr) {
	        for (var i = 0; i < markerArr.length; i++) {
	            markerArr[i].setMap(null);
	        }
	    }
	    infoWindow = new google.maps.InfoWindow();
	    service = new google.maps.places.PlacesService(map);

	    var type = $(this).text();
	    var request = {
	        bounds: map.getBounds(),
	        map: map,
	        location: haightAshbury,
	        keyword: type,
	        rankBy: google.maps.places.RankBy.PROMINENCE,
	        radius: 5000,
	        zoom: 13,
	        limit: 5,
	    };

	    service.radarSearch(request, callback);

	    function callback(results, status) {
	        // console.log(results)//Array of results with place information
	        markerArr = [];
	        for (var i = 0; i < results.length; i++) {
	            service.getDetails(results[i], function(result, status) {
	                // console.log(result);
	                if (result.rating > 4) {
		                console.log("Only the best of the best, Ratings are greater than 4");
		                addMarker(result);
		                addResults(result);
	                }                  
	            });
	        }//End for loop
	    }

	    function addResults(place) {
	            var b = $('<button>');
	                b.addClass('btn btn-default addToItin');
	                b.text('Add To Itinerary');
	                b.attr('data-name', place.name);
	                b.attr('data-addr', place.formatted_address);
	                b.attr('data-phone', place.formatted_phone_number);
	                b.attr('data-rating', place.rating);
	    
	            $('#list2').append("<li><p><b>Name: </b>" + place.name + "</p><p><b>Address: </b>" + place.formatted_address + "</p><p><b>Phone Number: </b>" + place.formatted_phone_number + "</p><p><b>Rating: </b>" + place.rating + "</p></li>");
	            $('#list2').append(b);
	    }

	    function addMarker(place) {

	        var marker = new google.maps.Marker({
	            map: map,
	            position: place.geometry.location,

	        });
	        markerArr.push(marker);
	        console.log(markerArr);

	        google.maps.event.addListener(marker, 'click', function() {
	            service.getDetails(place, function(result, status) {
	                // console.log(result);
	                if (status !== google.maps.places.PlacesServiceStatus.OK) {
	                    console.error(status);
	                    return;
	                }
	                infoWindow.setContent("<p><b>Name:</b>" + result.name + "<p><b>address:  </b>" + result.formatted_address + "<p><b>phone number:  </b>" + result.formatted_phone_number + "<p><b>rating: </b>" + result.rating);
	                infoWindow.open(map, marker);
	            });
	        });
	    }
	}

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
	var opportunities = ['Police', 'Fire Station', 'Red Cross', 'Youth Outreach', 'Charity', 'Habitat for Humanity']

	for (var i = 0; i < volunteer.length; i++) {
		if (volunteer[i] > 3) {
			$('#localHero').append("<button class='btn btn-danger' value=\""+opportunities[i]+"\">"+opportunities[i]+"</button>");
		}
	}

	$('#profilePic').append("<img class='pull-right' src="+user.photo+" width='100px' height='100px'>");
	$('#userName').html(user.user);
	for (var i = 0; i < powers.length; i++) {
		$('#powers').append("<button class='btn btn-danger' value=\""+places[i]+"\">"+powers[i]+"</button>");
	};

	initAutocomplete();


	$('.btn').on('click', function(){
		var place = $(this).attr("value");
		console.log(place);
		newResults(place);
	});
});