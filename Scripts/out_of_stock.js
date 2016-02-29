$(#showoosbeers).click(function() {
	if ($(#showoosbeers:checked).length > 0) {
		$(tr.danger).attr({class: "hiddenn"});
	} else {
		$(tr.hiddenn).attr({class: "danger"});
	}
}

