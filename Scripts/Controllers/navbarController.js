$(document).ready(function() {
	if (window.localStorage.getItem('user') == null) {
		$(".button-1").html('<a href="./signin.html"> Sign Up</a>');
		$(".button-2").html('<a href="./signin.html"> Sign In</a>');
	} else {
		$(".button-1").html(
			function() {return '<a href="#.html">' + window.localStorage.getItem('user') + '</a>'});
		$(".button-2").html('<a class="btn-signout" href="#"> Sign Out</a>');
	}
});

$(function() {
	$('.btn-signout').click(function() {
		signout();
	})
});

function signout() {
	window.localStorage.removeItem('user');
	window.location.href= 'main.html';
} 
