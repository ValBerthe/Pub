$(function() {
	$('.btn-signin').click(function() {
		signin();
	})
});

function signin() {
	var id = $('#signin-id').val();
	var password = $('#signin-password').val();
	console.log(password);
	if (is_valid_password(id, password)) {
		console.log('valid');
		$('#warning-msg').html('');
		signin_and_redirect_user(id);
	} else {
		console.log('Invalid');
		$('#warning-msg').html('Invalid User Name or Password');
		$('#warning-msg').css('color', 'red');
	}
}

function is_valid_password(id, password) {
	var res;
	$.ajax({
		async	: false,
		type	:'POST', 
    	url		: "http://pub.jamaica-inn.net/fpdb/api.php?",
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

function signin_and_redirect_user(id) {
	window.localStorage.setItem('user', id);
	window.location.href= 'orderBeer.html';
}