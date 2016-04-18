// call signin function when the sign in butten is clicked
$(function() {
	$('.btn-signin').click(function() {
		signin();
	})
});

//get user sign in
function signin() {
	var id = $('#signin-id').val();
	var password = $('#signin-password').val();
	if (is_valid_password(id, password)) {
		console.log('valid');
		$('#warning-msg').html('');
		signin_and_redirect_user(id);
	} else {
		$('#warning-msg').html('Invalid User Name or Password');
		$('#warning-msg').css('color', 'red');
	}
}

//check whether the password entered is the valid password for the user id
function is_valid_password(id, password) {
	var res;
	$.ajax({
		async	: false,
		type	:'GET', 
    	url		: "http://pub.jamaica-inn.net/fpdb/api.php",
    	data    : {	action : 'iou_get',
    			   	username: id,
    			  	password : password},
    	success	: function(data) {
    		if (data != undefined && data.type == 'iou_get') {
    			res = true;
    		} else {
    			res = false;
    		}
		}
	});
	return res;
}

//after getting user sign in, store user id in local storage and redirect user
function signin_and_redirect_user(id) {
	window.localStorage.setItem('user', id);
	window.location.href= 'orderBeer.html';
}