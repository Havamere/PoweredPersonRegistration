//||General functions for index/sign-in page||\\


$('#Log-in').click(function(){
	//console.log("button clicked");
	var user = JSON.parse(sessionStorage.getItem('user'));
	var picture = JSON.parse(sessionStorage.getItem('picture'));

	if (user !== null && user !== undefined) {
		$.ajax({
		  method: "POST",
		  url: "/logIn",
		  data: {user: user.user, photo: picture.photo, completed: false}
		})
		  .done(function( data ) {
		  	if (data.error) {
		  		alert(data.error);
		  	}
		  	alert(data.msg);

		  	console.log(data);

		  	sessionStorage.setItem('user', JSON.stringify(data.user));

		  	window.location = data.url;
		  });
	} else {
		alert('Please log in through Facebook first.');
	}
});

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

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '638211789673829',
      xfbml      : true,
      version    : 'v2.7'
    });

    FB.getLoginStatus(function(response) {
    	statusChangeCallback(response);
  	});
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=638211789673829";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log(response);
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
      //Creates a local storage spage for the user's info for the page's duration on the user's browser
      sessionStorage.setItem('user', JSON.stringify({user: response.name}));
    });

    console.log("Attempting to access profile picture.");
  	FB.api('/me/picture', function(response) {
  		console.log(response);
  		console.log(response.data.url);
  		sessionStorage.setItem('picture', JSON.stringify({photo: response.data.url}));
  	});

  }