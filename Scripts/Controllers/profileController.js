var firstname;
var lastname;
var credit;
var purchases_res;
var payments_res;

prepare_data();

//call coresponding functions to prepare all the data we need
function prepare_data() {
	var id = window.localStorage.getItem('user');
	var password = window.localStorage.getItem('user');
	prepare_data_for_userinfo(id, password);
	prepare_data_for_purchases(id, password);
	prepare_data_for_payments(id, password);
}

//prepare user general infomation
function prepare_data_for_userinfo(id, password) {
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

//prepare user purchases information
function prepare_data_for_purchases(id, password) {
	$.ajax({
		async	: false,
		type	:'GET', 
    	url		: "http://pub.jamaica-inn.net/fpdb/api.php",
    	data    : {	action : 'purchases_get',
    			   	username: id,
    			  	password : password},
    	success	: function(data) {
    		if (data != undefined && data.type == 'purchases_get') {
    			purchases_res = data.payload;
    		} else {
    			purchases_res = undefined;
    		}
		}
	});
}

//prepare user payments information
function prepare_data_for_payments(id, password) {
	$.ajax({
		async	: false,
		type	:'GET', 
    	url		: "http://pub.jamaica-inn.net/fpdb/api.php",
    	data    : {	action : 'payments_get',
    			   	username: id,
    			  	password : password},
    	success	: function(data) {
    		if (data != undefined && data.type == 'payments_get_all') {
    			payments_res = data.payload;
    		} else {
    			payments_res = undefined;
    		}
		}
	});
}

//function to display all the information in the page
$(function() {
	$('a').click(function() {
		$('li').removeClass('active');
		$(this).parent().addClass('active');
		change_tab_info();
	});

	show_user_info();
	change_credit_color();
	show_tab_info();
})

//display credit amount in correct color
//red for negative balance, green for positive balance
function change_credit_color() {
	if (credit < 0) {
		$(".credit-amount").css("color", "red");
	} else {
		$(".credit-amount").css("color", "green");
	}
}

//show payments and puschases list
function show_tab_info() {
	show_purchases_info();
	show_payments_info();
	if ($(".purchases-tab").hasClass("active")) {
		$(".purchases-container").show();
		$(".payments-container").hide();
	} else {
		$(".purchases-container").hide();
		$(".payments-container").show();
	}
}

//show the correct information when the 2 tabs (purchases and payments) are clicked
function change_tab_info() {
	if ($(".purchases-tab").hasClass("active")) {
		$(".purchases-container").show();
		$(".payments-container").hide();
	} else {
		$(".purchases-container").hide();
		$(".payments-container").show();
	}
}

//show basic user information
function show_user_info() {
	$(".userid").html("Hi " + window.localStorage.getItem('user') + " !");
	$(".username").html(firstname + ' ' + lastname);
	$(".credit-amount").html(' ' + credit);
}

//show purchases list
function show_purchases_info() {
	var purchases_no = purchases_res.length;
	var tr_content;
	for (var i = 0; i < purchases_no; i++) {
		tr_content = '<tr>';
		tr_content += '<td>' + purchases_res[i].namn + '</td>';
		tr_content += '<td>' + purchases_res[i].namn2 + '</td>';
		tr_content += '<td>' + purchases_res[i].transaction_id + '</td>';
		tr_content += '<td>' + purchases_res[i].beer_id + '</td>';
		tr_content += '<td>' + purchases_res[i].timestamp + '</td>';
		tr_content += '<td>' + purchases_res[i].price + '</td>';
		tr_content += '</tr>';
		$(".purchases-tbody").append(tr_content);
	}
}

function show_payments_info() {
	var payments_no = payments_res.length;
	var tr_content;
	for (var i = 0; i < payments_no; i++) {
		tr_content = '<tr>';
		tr_content += '<td>' + payments_res[i].transaction_id + '</td>';
		tr_content += '<td>' + payments_res[i].timestamp + '</td>';
		tr_content += '<td>' + payments_res[i].amount + '</td>';
		tr_content += '</tr>';
		$(".payments-tbody").append(tr_content);
	}
}