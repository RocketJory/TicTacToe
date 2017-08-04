var animSpeed = 400;
var numPlayers;
var p1Symbol;
var p2Symbol;
var p1name;
var p2name;
var p1wins = 0;
var p2wins = 0;
var pSymbols = ['',''];
var playerTurn;
var gameOn;
var initBoard = [['','',''],['','',''],['','','']];
var gameBoard = initBoard;
var rowNum = { bottom:2, middle:1, top:0 };
var colNum = { left:0, middle:1, right:2 };
var rowNames = ['top','middle','bottom'];
var colNames = ['left','middle','right'];

// Set the number of players, go to next menu
function setNumPlayers(num) {
	numPlayers = num;
	$("#player-select").slideUp(animSpeed);
	$("#symbol-select").delay(animSpeed).slideDown(animSpeed);
	if ( numPlayers == 1 ) {
		p1name = 'Player ';
		p2name = 'Computer ';
	} else {
		p1name = 'Player ';
		p2name = 'Player ';
	};
};

function randPlayer() {
	var pturn = Math.floor(Math.random()*2);
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
	console.log('player turn = ' + nextP);
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

// Update win counters
function updateScore() {
	$('#p1text').text(p1name + p1Symbol + ': ' + p1wins);
	$('#p2text').text(p2name + p2Symbol + ': ' + p2wins);
};

// Set the player symbols, go to next menu
function setP1Symbol(symb) {
	var crow;
	var ccol;
	// Set symbols
	p1Symbol = symb;
	if ( symb == 'x' ) {
		p2Symbol = 'o';
	} else {
		p2Symbol = 'x';
	}
	pSymbols[0] = p1Symbol;
	pSymbols[1] = p2Symbol;
	console.log('p1 = ' + p1Symbol + ' p2 = ' + p2Symbol);
	// setup game board
	$('#p1text').text('player ' + p1Symbol + ': 0');
	$('#p2text').text('player ' + p2Symbol + ': 0');
	$('#symbol-select').slideUp(animSpeed);
	$('#game-board').delay(animSpeed).slideDown(animSpeed);
	$('#extra-buttons').delay(animSpeed).slideDown(animSpeed);
	// initialize game vars
	updateScore();
	gameOn = true;
	playerTurn = randPlayer();
	console.log('player Turn = ' + playerTurn);
	if ( playerTurn == 1 && numPlayers == 1 ) {
		[crow,ccol] = AImove();
		placeSymbol(crow,ccol);
		playerTurn = nextPlayer(playerTurn);
	};
};

function AIturn() {
	var crow;
	var ccol;
	[crow,ccol] = AImove();
	placeSymbol(crow,ccol);
	playerTurn = nextPlayer(playerTurn);
};

// handle wins or ties
function handleWinsTies() {
	// if win
	if ( checkForWin(gameBoard,pSymbols[playerTurn]) ) {
		// alert player
		alert('player ' + pSymbols[playerTurn] + ' wins!');
		// increment wins
		if (playerTurn==0) {
			p1wins += 1;
		} else {
			p2wins += 1;
		};
		console.log('win');
		updateScore();
		resetBoard();
		playerTurn = nextPlayer(playerTurn);
		if ( playerTurn == 1 && numPlayers == 1) {
			AIturn();
		};
		return true;
	// if not a win
	} else {
		// check for a tie
		if ( checkForTie(gameBoard) ) {
			console.log('tie');
			alert("It's a tie!");
			resetBoard();
			playerTurn = randPlayer();
			if ( playerTurn == 1 && numPlayers == 1 ) {
				AIturn();
			};
			return true;
		// if not a tie
		} else {
			console.log('not a tie');
			playerTurn = nextPlayer(playerTurn);
			console.log('player Turn = ' + playerTurn);
			return false;
		};
	};
};

// place symbol in specified index
function placeSymbol(row,col) {
	var irow = rowNum[row];
	var icol = colNum[col];
	var idStr = '#' + row + '-' + col;
	var symbol = pSymbols[playerTurn];
	// if tile is blank
	if ( gameBoard[irow][icol] == '' ) {
		console.log('placing symbol...');
		console.log(idStr);
		gameBoard[irow][icol] = symbol;
		$(idStr).text(symbol);
		console.log(gameBoard);
	};
};

function checkForTie(board) {
	var symbCount = 0;
	for (var i=0;i<3;i++) {
		for (var j=0;j<3;j++) {
			if (board[i][j] == p1Symbol || board[i][j] == p2Symbol) {
				symbCount += 1;
			};
		};
	};
	if (symbCount==9) {
		return true;
	} else {
		return false;
	};
};

function resetBtn() {
	numPlayers = 0;
	p1Symbol = '';
	p2Symbol = '';
	p1wins = 0;
	p2wins = 0;
	pSymbols = ['',''];
	gameBoard = [['','',''],['','',''],['','','']];
	$('#game-board').slideUp(animSpeed);
	$('#extra-buttons').slideUp(animSpeed);
	$('#player-select').delay(animSpeed).slideDown(animSpeed);
	return;
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
	// check columns
	for (var col=0;col<3;col++) {
		if (board[0][col]==sym && board[1][col]==sym && board[2][col]==sym) {
			return true;
		};
	};
	// otherwise no win
	return false;
};

function AImove() {
	console.log('AI thinking');
	var newBoard = gameBoard.slice();
	var crow;
	var ccol;
	var freeMoves = [];
	var numFreeMoves = 0;
	var moveNum;
	// placeholder AI
	if ( false ) {
		for ( var j=0;j<3;j++ ) {
			for ( var i=0;i<3;i++ ) {
				if ( gameBoard[j][i] == '' ) {
					crow = rowNames[j];
					ccol = colNames[i];
					return [crow,ccol];
				};
			};
		};
	} else {
	// minmax AI
		// check for winning moves
		for ( var j=0;j<3;j++ ) {
			for ( var i=0;i<3;i++ ) {
				var newBoard = gameBoard.slice();
				if ( newBoard[j][i] == '' ) {
					newBoard[j][i] = p2Symbol;
					if ( checkForWin(newBoard,p2Symbol) ) {
						console.log('AI: winning move');
						crow = rowNames[j];
						ccol = colNames[i];
						gameBoard[j][i] = '';
						console.log(crow,ccol)
						return [crow,ccol];
					} else {
						newBoard[j][i] = '';
					}
				}
			}
		}
		// check for blocking moves
		for ( var j=0;j<3;j++ ) {
			for ( var i=0;i<3;i++ ) {
				var newBoard = gameBoard.slice();
				if ( newBoard[j][i] == '' ) {
					newBoard[j][i] = p1Symbol;
					if ( checkForWin(newBoard,p1Symbol) ) {
						console.log('AI: blocking move');
						crow = rowNames[j];
						ccol = colNames[i];
						console.log(crow,ccol)
						gameBoard[j][i] = '';
						return [crow,ccol];
					} else {
						newBoard[j][i] = '';
					}
				}
			}
		}
		// otherwise play a corner
		for (var j=0;j<3;j+=2 ) {
			for (var i=0;i<3;i+=2 ) {
				if ( gameBoard[j][i] == '' ) {
					numFreeMoves += 1;
					console.log('numFreeMoves = ' + numFreeMoves);
					crow = rowNames[j];
					ccol = colNames[i];
					freeMoves.push([j,i]);
					console.log(crow,ccol)
				}
			}
		}
		if (numFreeMoves > 0) {
			console.log('AI: corner move');
			console.log('free moves = ');
			console.log(freeMoves);
			moveNum = Math.floor(Math.random()*numFreeMoves);
			console.log('moveNum = ' + moveNum);
			crow = rowNames[freeMoves[moveNum][0]];
			ccol = colNames[freeMoves[moveNum][1]];
			console.log(crow,ccol)
			return [crow,ccol];
		}
		console.log('AI: other moves');
		// otherwise play center
		if ( gameBoard[1][1] == '' ) {
			crow = rowNames[1];
			ccol = colNames[1];
			console.log(crow,ccol)
			return [crow,ccol];
		}
		// reinitialize moves array
		numFreeMoves = 0;
		freeMoves = [];
		// otherwise play a side
		if ( gameBoard[0][1] == '' ) {
			crow = rowNames[0];
			ccol = colNames[1];
			numFreeMoves += 1;
			freeMoves.push([j,i]);
			console.log('numFreeMoves = ' + numFreeMoves);
			console.log(crow,ccol);
		}
		if ( gameBoard[1][0] == '' ) {
			crow = rowNames[1];
			ccol = colNames[0];
			numFreeMoves += 1;
			freeMoves.push([j,i]);
			console.log('numFreeMoves = ' + numFreeMoves);
			console.log(crow,ccol);
		}
		if ( gameBoard[1][2] == '' ) {
			crow = rowNames[1];
			ccol = colNames[2];
			numFreeMoves += 1;
			freeMoves.push([j,i]);
			console.log('numFreeMoves = ' + numFreeMoves);
			console.log(crow,ccol);
		}
		if ( gameBoard[2][1] == '' ) {
			crow = rowNames[2];
			ccol = colNames[1];
			numFreeMoves += 1;
			freeMoves.push([j,i]);
			console.log('numFreeMoves = ' + numFreeMoves);
			console.log(crow,ccol);
		}
		// pick an available side move
		if (numFreeMoves > 0) {
			console.log('AI: side move');
			console.log('free moves = ');
			console.log(freeMoves);
			moveNum = Math.floor(Math.random()*numFreeMoves);
			console.log('moveNum = ' + moveNum);
			crow = rowNames[freeMoves[moveNum][0]];
			ccol = colNames[freeMoves[moveNum][1]];
			console.log(crow,ccol)
			return [crow,ccol];
		}
	}
};

// Wrapper to drive either single-player or two-player moves
function gameModes(prow,pcol) {
	var crow;
	var ccol;
	if ( gameBoard[rowNum[prow]][colNum[pcol]] != '' ) { return; }
	if ( numPlayers == 1 ) {
		placeSymbol(prow,pcol);
		finish = handleWinsTies();
		if ( !finish ) {
			[crow,ccol] = AImove();
			console.log('AI move = ' + crow + ',' + ccol)
			placeSymbol(crow,ccol);
			handleWinsTies();
		};
	} else {
		placeSymbol(prow,pcol);
		handleWinsTies();
	};
};

// ----------------------------------------------------------
// MAIN FUNCTION
// ----------------------------------------------------------
$(document).ready( function() {
	console.log("script start");
	var touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)

	// get array of tile id's
	var tiles = document.getElementsByClassName('board-tile');
	var tileIds = [];
	for (var i=0;i<tiles.length;i++) {
		tileIds.push(tiles[i].id);
	};

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
	// Reset button
	$('#restart-button').click( function() {
		resetBoard();
		resetBtn();
	});
	// tile hovers:
	if (!touchsupport) {
		for (tile in tileIds) {
			$('#'+tileIds[tile]).on('mouseenter', function () {
				$(this).css('background-color', '#428bca');
			}).on('mouseleave', function () {
				$(this).css('background-color', 'white');
			}).on('click', function () {
				$(this).css('background-color', 'white');
			});
		};
	};
	// Board tile clicks:
	// Top row
	$('#top-left').click( function() {
		gameModes('top','left');
	});
	$('#top-middle').click( function() {
		gameModes('top','middle');
	});
	$('#top-right').click( function() {
		gameModes('top','right');
	});
	// Middle row
	$('#middle-left').click( function() {
		gameModes('middle','left');
	});
	$('#middle-middle').click( function() {
		gameModes('middle','middle');
	});
	$('#middle-right').click( function() {
		gameModes('middle','right');
	});
	// bottom row
	$('#bottom-left').click( function() {
		gameModes('bottom','left');
	});
	$('#bottom-middle').click( function() {
		gameModes('bottom','middle');
	});
	$('#bottom-right').click( function() {
		gameModes('bottom','right');
	});

	// Slide down menu
	$("#player-select").slideDown();
});
