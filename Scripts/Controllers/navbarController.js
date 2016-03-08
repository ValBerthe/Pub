$(function() {
	if (window.localStorage.getItem('user') == null) {
		$(".button-1").html('<a href="./signin.html"> Sign Up</a>');
		$(".button-2").html('<a href="./signin.html"> Sign In</a>');
	} else {
		$(".button-1").html('<a href="profile.html">' + window.localStorage.getItem('user') + '</a>');
		$(".button-2").html('<a class="btn-signout" href="#"> Sign Out</a>');
	}
});

$(function() {
	$('.btn-signout').click(function() {
		signout();
	})

	$('a').click(function() {
		// active_tab(this);
		console.log("haha");
		$('li').removeClass(active);
		$(this).parent().addClass(active);
	})
});

function signout() {
	window.localStorage.removeItem('user');
	window.location.href= 'main.html';
} 

function active_tab(tab) {
	$('li').removeClass(active);
	$(tab).addClass(active);
}
