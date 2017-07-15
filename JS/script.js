var animSpeed = 400;
var numPlayers;
var p1Symbol;
var p2Symbol;

function setNumPlayers(num) {
	numPlayers = num;
	$("#player-select").slideUp(animSpeed);
	$("#symbol-select").delay(animSpeed).slideDown(animSpeed);
};

function setP1Symbol(symb) {
	p1Symbol = symb;
	if ( symb == 'x' ) {
		p2Symbol = 'o';
	} else {
		p2Symbol = 'x';
	}
	$('#symbol-select').slideUp(animSpeed);
	$('#game-board').delay(animSpeed).slideDown(animSpeed);
};

// ----------------------------------------------------------
// MAIN FUNCTION
// ----------------------------------------------------------
$(document).ready(function(){
	console.log("script start");

	// Listeners
	// Player selects
	$('#player1-btn').click( function() {
		setNumPlayers(1);
	});
	$('#player2-btn').click( function() {
		setNumPlayers(2);
	});
	// Symbol selects
	$('#x-symbol').click( function() {
		setP1Symbol('x');
	});
	$('#o-symbol').click( function() {
		setP1Symbol('o');
	});

	// Slide down menu
	$("#player-select").slideDown();
});
