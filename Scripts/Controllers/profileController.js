var firstname;
var lastname;
var credit;
var res;

prepare_data();

function prepare_data() {
	var id = window.localStorage.getItem('user');
	var password = window.localStorage.getItem('user');
	$.ajax({
		async	: false,
		type	:'GET', 
    	url		: "http://pub.jamaica-inn.net/fpdb/api.php",
    	data    : {	action : 'iou_get',
    			   	username: id,
    			  	password : password},
    	success	: function(data) {
    		if (data != undefined && data.type == 'iou_get') {
    			firstname = data.payload[0].first_name;
    			lastname = data.payload[0].last_name;
    			credit = data.payload[0].assets;
    		} else {
    			firstname = undefined;
    			lastname = undefined;
    			credit = undefined;
    		}
		}
	});
}

$(function() {
	$(".userid").html("Hi " + window.localStorage.getItem('user') + " !");
	$(".username").html(firstname + ' ' + lastname);
	$(".credit").html("Your credit: <label class='credit-amount'>" + credit + "</label>");
	
	change_credit_color();

	show_tab_info();
})

$(function() {
	$('a').click(function() {
		$('li').removeClass('active');
		$(this).parent().addClass('active');
		show_tab_info();
	})
})

function change_credit_color() {
	if (credit < 0) {
		$(".credit-amount").css("color", "red");
	} else {
		$(".credit-amount").css("color", "green");
	}
}

function show_tab_info() {
	if ($(".purchases-tab").hasClass("active")) {
		$(".purchases-container").show();
		$(".payments-container").hide();
	} else {
		$(".purchases-container").hide();
		$(".payments-container").show();
	}
}