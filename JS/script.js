var animSpeed = 400;
var numPlayers;
var p1Symbol;
var p2Symbol;
var p1wins = 0;
var p2wins = 0;
var pSymbols = ['',''];
var playerTurn;
var gameOn;
var gameBoard = [['','',''],['','',''],['','','']];
var rowNum = { bottom:2, middle:1, top:0 };
var colNum = { left:0, middle:1, right:2 };

// Set the number of players, go to next menu
function setNumPlayers(num) {
	numPlayers = num;
	$("#player-select").slideUp(animSpeed);
	$("#symbol-select").delay(animSpeed).slideDown(animSpeed);
};

function randPlayer() {
	pturn = Math.floor(Math.random()*2);
	$('#turn-text').text(pSymbols[pturn]+"'s turn");
	return pturn;
};

function nextPlayer(num) {
	var nextP;
	if (num==0) {
		nextP = 1;
	} else {
		nextP = 0;
	}
	$('#turn-text').text(pSymbols[nextP]+"'s turn");
	return nextP;
};

// reset the game board array and text
function resetBoard() {
	console.log('resetting board');
	for (var i=0;i<3;i++) {
		for (var j=0;j<3;j++) {
			gameBoard[i][j] = '';
		};
	};
	$('#top-left').text('');
	$('#top-middle').text('');
	$('#top-right').text('');
	$('#middle-left').text('');
	$('#middle-middle').text('');
	$('#middle-right').text('');
	$('#bottom-left').text('');
	$('#bottom-middle').text('');
	$('#bottom-right').text('');
};

// Set the player symbols, go to next menu
function setP1Symbol(symb) {
	// Set symbols
	p1Symbol = symb;
	if ( symb == 'x' ) {
		p2Symbol = 'o';
	} else {
		p2Symbol = 'x';
	}
	pSymbols[0] = p1Symbol;
	pSymbols[1] = p2Symbol;
	// setup game board
	$('#p1text').text('player ' + p1Symbol + ':');
	$('#p2text').text('player ' + p2Symbol + ':');
	$('#symbol-select').slideUp(animSpeed);
	$('#game-board').delay(animSpeed).slideDown(animSpeed);
	$('#extra-buttons').delay(animSpeed).slideDown(animSpeed);
	// initialize game vars
	gameOn = true;
	playerTurn =randPlayer();
	$('#turn-text').delay(animSpeed).text(pSymbols[playerTurn]+"'s turn");
	console.log('player Turn = ' + playerTurn);
};

// place symbol in specified index
function placeSymbol(row,col) {
	var irow = rowNum[row];
	var icol = colNum[col];
	var idStr = '#' + row + '-' + col;
	var symbol = pSymbols[playerTurn];
	// if tile is blank
	console.log(playerTurn);
	if ( gameBoard[irow][icol] == '' ) {
		console.log(idStr);
		gameBoard[irow][icol] = pSymbols[playerTurn];
		$(idStr).text(symbol);
		console.log(gameBoard);
		// if win
		if ( checkForWin(gameBoard,symbol) ) {
			// alert player
			alert('player ' + symbol + ' wins!');
			// increment wins
			if (playerTurn==0) {
				p1wins += 1;
			} else {
				p2wins += 1;
			}
			resetBoard();
			playerTurn = randPlayer();
		// if not a win
		} else {
			playerTurn = nextPlayer(playerTurn);
		};
	};
};

// Check for a winning board
function checkForWin(board,sym) {
	// check diagonals
	if (board[0][0]==sym && board[1][1]==sym && board[2][2]==sym) {
		return true;
	};
	if (board[0][2]==sym && board[1][1]==sym && board[2][0]==sym) {
		return true;
	};
	// check rows
	for (var row=0;row<3;row++) {
		if (board[row][2]==sym && board[row][1]==sym && board[row][0]==sym) {
			return true;
		};
	};
	// check columsn
	for (var col=0;col<3;col++) {
		if (board[0][col]==sym && board[1][col]==sym && board[2][col]) {
			return true;
		};
	};
	// otherwise no win
	return false;
};

// ----------------------------------------------------------
// MAIN FUNCTION
// ----------------------------------------------------------
$(document).ready( function() {
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
	// Board tiles:
	// Top row
	$('#top-left').click( function() {
		placeSymbol('top','left');
	});
	$('#top-middle').click( function() {
		placeSymbol('top','middle');
	});
	$('#top-right').click( function() {
		placeSymbol('top','right');
	});
	// Middle row
	$('#middle-left').click( function() {
		placeSymbol('middle','left');
	});
	$('#middle-middle').click( function() {
		placeSymbol('middle','middle');
	});
	$('#middle-right').click( function() {
		placeSymbol('middle','right');
	});
	// bottom row
	$('#bottom-left').click( function() {
		placeSymbol('bottom','left');
	});
	$('#bottom-middle').click( function() {
		placeSymbol('bottom','middle');
	});
	$('#bottom-right').click( function() {
		placeSymbol('bottom','right');
	});

	// Slide down menu
	$("#player-select").slideDown();
});
