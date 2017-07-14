var animSpeed = 400;
var numPlayers;
var p1Symbol;
var p2Symbol;

function setNumPlayers(num) {
	numPlayers = num;
	$("#player-select").slideUp(animSpeed);
	$("#symbol-select").delay(animSpeed).slideDown(animSpeed);
};

// ----------------------------------------------------------
// MAIN FUNCTION
// ----------------------------------------------------------
$(document).ready(function(){
	console.log("script start");

	// Listeners
	$('#player1-btn').click( function() {
		setNumPlayers(1);
	});
	$('#player2-btn').click( function() {
		setNumPlayers(2);
	});

	// Slide down menu
	$("#player-select").slideDown();
});
