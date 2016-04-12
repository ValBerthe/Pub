$("#showoosbeers").click(function() {
	if ($("#showoosbeers:checked").length < 1) {
		$('.danger[style="display: table-row;"]').attr({style: 'display: none;'});
	} else {
		$('.danger[style="display: none;"]').attr({style: 'display: table-row;'});
	}
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    copie = $("#" + data + " td:first").clone();
  	prix = $("#" + data + " td:eq(3)").clone();
    
    if (document.getElementById("beerCart").innerHTML.indexOf(copie.text()) > -1) { // If the beverage name is already in the cart
    	if (document.getElementById("beerCart").innerHTML.indexOf('<div id="' + copie.text() + 'div">' + copie.text() + '</div>') > -1) { //If the div containing the beverage is already in the cart
    		var newBadge = document.createElement("SPAN");
	    	var $newBadge = $(newBadge);
	    	$newBadge.attr({id: copie.text() + "id"});
	    	$newBadge.attr({class: " badge pull-right"});
	    	$newBadge[0].appendChild(document.createTextNode("2"));
	    	document.getElementById(copie.text() + "div").appendChild($newBadge[0]);
	    	document.getElementById("totalBeer").innerHTML = (parseInt(document.getElementById("totalBeer").innerHTML) + parseInt(prix.text().substring(0,3))).toString() + " SEK"; // Update prise
    	} else { //If the div is not present
    		document.getElementById(copie.text() + "id").innerHTML = (parseInt(document.getElementById(copie.text() + "id").innerHTML) + 1).toString(); // Increase the number in the badge
    		document.getElementById("totalBeer").innerHTML = (parseInt(document.getElementById("totalBeer").innerHTML) + parseInt(prix.text().substring(0,3))).toString() + " SEK";
    	}
    } else { // If the beverage is not yet in the cart
    	var htmlCopy = document.createElement("DIV");
    	var HR = document.createElement("HR");
    	var $htmlCopy = $(htmlCopy);
    	$htmlCopy.attr({id: copie.text() + "div"});
    	htmlCopy.appendChild(document.createTextNode(copie.text()));
    	ev.target.appendChild(htmlCopy);
    	ev.target.appendChild(HR);
    	document.getElementById("totalBeer").innerHTML = (parseInt(document.getElementById("totalBeer").innerHTML) + parseInt(prix.text().substring(0,3))).toString() + " SEK";

    }


}



<!-- -------------------------------------------- -->



var xhr = new XMLHttpRequest();
xhr.open('GET','http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get')

xhr.addEventListener('readystatechange', function() {
	if (xhr.readyState === 4 && xhr.status === 200) {
		var reponse = JSON.parse(xhr.responseText);
		var response = reponse.payload;
		var name1;
		var name2;
		var sb_price;
		var pu_price;
		var beer;
		var count;
		var price;
		var myString;

		for (var i = 0; i <= response.length ; i++) {

			name1=response[i].namn;
			name2=response[i].namn2;
			sb_price=response[i].sbl_price;
			pu_price=response[i].pub_price;
			beer=response[i].beer_id;
			count=response[i].count;
			price=response[i].price;
			if (name1 !== "" && name2 !== "" && sb_price !== "" && pu_price !== "" && beer !== "" && count !== "" && price !== "") {
				if (parseInt(count) > 0) {
					$('<tr id="pasdid" draggable="true" ondragstart="drag(event)"></tr>').appendTo(document.getElementById('beerTable'));
				} else {
					$('<tr id="pasdid" class="danger" style="display: none;"></tr>').appendTo(document.getElementById('beerTable'));
				}
				document.getElementById("pasdid").innerHTML = '<td id="pasdid1"></td><td id="pasdid2"></td><td id="pasdid3"></td><td id="pasdid4"></td><td id="pasdid5"></td><td id="pasdid6"></td><td id="pasdid7"></td>'
				document.getElementById("pasdid1").innerHTML = name1;
				$('#pasdid1').attr('id', "id1");
				document.getElementById("pasdid2").innerHTML = name2;
				$('#pasdid2').attr('id', "id2");
				if (parseInt(count) > 0) {
					document.getElementById("pasdid3").innerHTML = count;
				} else {
					document.getElementById("pasdid3").innerHTML = "Out of stock !"
				}
				$('#pasdid3').attr('id', "id3");
				document.getElementById("pasdid4").innerHTML = pu_price + " SEK";
				$('#pasdid4').attr('id', "id4");
				$('#pasdid').attr('id',i.toString());
			}
		}
	}
}, false);

xhr.send(null);
