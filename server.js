// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongojs = require('mongojs');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 8080; // Sets an initial port. We'll use this later in our listener

// Run Morgan for Logging
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// -------------------------------------------------

// MongoDB Configuration configuration
// use mongojs to hook the database to the db variable 
var config = require('./config.js');
var db = mongojs(config.dbURI, [config.collections]);

//var db = mongojs('PoweredPeople', ['poweredIndex']);


db.on('error', function (err) {
	//logs error if occurs while signing in
  console.log('MongoDB Error: ', err);
});
//var poweredIndex = db.collection('PowersIndex');
// -------------------------------------------------
		//Routes//
// -------------------------------------------------

app.get('/', function (req, res) {
	//sets home page
	res.sendFile('./public/app/index.html');
});

app.post('/logIn', function(req, res) {
	//sets req.body to more coherent term
	var registrant = req.body;
	//tests data collection from page
	console.log(registrant);

	db.poweredIndex.findOne({"user": registrant.user}, function(err, data) {
		//shows errors
		if (err) console.log(err);
		//confirms data
		console.log("data: " + data);
		
		data = data || {};

		if (data.user == registrant.user) {
			//checks if data attribute for for scan page completed is true
			if (data.completed === true) {
				//informs user of welcom back, and re-directs user to profile page
				res.json({user: data.user, msg: "Welcome back!", url: '/profile.html'})	
			} else {
				//informs user that scan page was not completed, and redirects to scan page
				res.json({user: data.user, msg: "Please complete your scan and questionnaire.", url: '/scan.html'})
			}
		} else {
			//inserts new user if one was not found
			db.poweredIndex.insert(registrant, function(err, saved) {
				// show any errors
			    if (err) {
			      console.log(err);
			    } 
			    console.log(saved);
			    // otherwise, send the response to the client (for AJAX success function)
			    else {
			    	//sends user to scan page
			      res.json({user: saved.user, msg: "Please complete your scan and questionnaire.", url: '/scan.html'});
			    };
			});
		}
	});
});

app.post('/updatePowers', function(req, res) {
	var updateUser = req.body.userProfile;
	console.log(updateUser);

	db.poweredIndex.update({'user': updateUser.user}, { $set : {'completed': true, 'powers': updateUser.powers, 'scores': updateUser.scores}}, function(err, data) {
		if (err) {
			console.log(err);
		}
		//confirms data
		console.log(data);
		res.json({msg: "Excellent.  Building your profile now!", url: '/profile.html'});
	});
});

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});


// app.post('/signUp', function(req, res) {
// 	//sets req.body to user for easier typing
// 	var user = req.body;
// 	//tests data collection from page
// 	console.log(user);

// 	db.poweredIndex.findOne({"user": user.user}, function(err, data) {
// 		//shows errors
// 		if (err) console.log(err);
// 		//confirms data
// 		console.log(data);
// 		//sets data to empty object if data doesn't exist
// 		data = data || {};
// 		//confirms user name from db and user name from sign-up
// 		console.log(data.user, user.user);
// 		//tests if user already exists
// 		if (data.user == user.user) {
// 			//tells user that user name already exists and redirects to sign-in path
// 			res.json({error: "User already exists!", url: '/index.html'})
// 		} else {
// 			//inserts new user if one was not found
// 			db.poweredIndex.insert(user, function(err, saved) {
// 				// show any errors
// 			    if (err) {
// 			      console.log(err);
// 			    } 
// 			    // otherwise, send the response to the client (for AJAX success function)
// 			    else {
// 			    	//sends user to scan page
// 			      res.json({user: saved.user, url: '/scan.html'});
// 			    };
// 			});
// 		}
// 	});	
// });

// app.post('/signIn', function(req, res) {
// 	//sets req.body to more coherent term
// 	var returnUser = req.body;
// 	//tests data collection from page
// 	console.log(returnUser);

// 	db.poweredIndex.findOne({"user": returnUser.user}, function(err, data) {
// 		//shows errors
// 		if (err) console.log(err);
// 		//confirms data
// 		console.log(data);
// 		//sets data to empty object if data doesn't exist
// 		data = data || {};
// 		if (data.user == returnUser.user) {
// 			//checks if data attribute for for scan page completed is true
// 			if (data.completed === true) {
// 				//informs user of welcom back, and re-directs user to profile page
// 				res.json({msg: "Welcome back!", url: '/profile.html'})	
// 			} else {
// 				//informs user that scan page was not completed, and redirects to scan page
// 				res.json({msg: "Please complete your scan and questionnaire.", url: '/scan.html'})
// 			}
// 		} else {
// 			//upon no match found in DB, runs user through sign-up path
// 			res.json({error: "User doesn't exist, please sign up!", url: '/index.html'})
// 		}
// 	});
// });
