$("#showoosbeers").click(function() {
	if ($("#showoosbeers:checked").length < 1) {
		$('.danger[style="display: table-row;"]').attr({style: 'display: none;'});
	} else {
		$('.danger[style="display: none;"]').attr({style: 'display: table-row;'});
	}
});

