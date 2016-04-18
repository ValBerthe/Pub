//show the correct header
//case 1: user has not signed in
//case 2: user has signed in
$(function() {
	if (window.localStorage.getItem('user') == null) {
		$(".button-1").html('<a class="t-signup" href="./signin.html"> Sign Up</a>');
		$(".button-2").html('<a class="t-signin" href="./signin.html"> Sign In</a>');
	} else {
		$(".button-1").html('<a href="profile.html">' + window.localStorage.getItem('user') + '</a>');
		$(".button-2").html('<a class="btn-signout" href="#"> Sign Out</a>');
	}
});

$(function() {
	//sign user out when the sign out button is clicked
	$('.btn-signout').click(function() {
		signout();
	})
	//high light the correct header tab
	$('a').click(function() {
		$('li').removeClass('active');
		$(this).parent().addClass('active');
	})
});

//function to get user sign out
function signout() {
	window.localStorage.removeItem('user');
	window.location.href= 'main.html';
} 

//high light the correct heade tab
function active_tab(tab) {
	$('li').removeClass('active');
	$(tab).addClass('active');
}
