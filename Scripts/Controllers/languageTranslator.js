change_language();

//display the page in correct language when the flags are clicked
$(function() {
	$('.flag').click(function() {
		get_language(this);
		change_language();
	});
});

//get the language user wants to change to
function get_language(flag) {
	if ($(flag).hasClass('uk')) {
		window.localStorage.setItem('lang', 'uk');
	} else {
		window.localStorage.setItem('lang', 'sv');
	}
}

//change the language
function change_language() {
    var language = window.localStorage.getItem('lang');
    if (language == undefined) {
        language = 'uk';
    }
    $.ajax({
        url: '../../language.xml',
        success: function(xml) {
            $(xml).find('translation').each(function(){
                var id = $(this).attr('id');
                var text = $(this).find(language).text();
                $("." + id).html(text);
            });
        }
    });
}

