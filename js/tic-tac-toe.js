$(document).ready(() => {
    "use strict";

    let squares = $('.playSquares')
    let player1 = true;
    let boardObj = {
        topRow: $('.topRow'),
        middleRow: $('.middleRow'),
        bottomRow: $('.bottomRow'),
    }

    const reset = $("#resetButton");
    const turnInfo = $('#turn');
    const start = $('#2P');
    const winTittle = $('#tittle');
    let turnCount = 0;
    let playerName
    function showTurn() {
        if (player1) {
            turnInfo.prepend('<h5 id="player1Turn">Player 1 Turn</h5>');
            $('#player2Turn').html("");
        } else {
            turnInfo.prepend('<h5 id="player2Turn">Player 2 Turn</h5>');
            $('#player1Turn').html( "");
        }
    }

    //check if square is empty and player turn;
    function playerTurn () {
        if ($(this).html().length < 1) {
            if (player1) {
                $(this).html("&cross;");
                player1 = false;
                playerName = "player 1"
            } else {
                $(this).html("&xcirc;");
                player1 = true;
                playerName = "player 2"

            }

        }
        turnCount++
        showTurn();
        checkWin(boardObj, boardObj.middleRow, boardObj.bottomRow, turnCount, playerName);
    }

    function checkWin (t, m, r, num, player) {
        for (const squares of t.topRow) {
            if (squares.innerHTML !== "") {
                if (squares.innerHTML === "✗") {
                    winTittle.append(`<h2 id="win">${player} won in ${num} moves</h2>`);
                }
            }

        }
        // else if (t.html() === "◯" && m.html() === "◯" && r.html() === "◯") {
        //     winTittle.append(`<h2 id="win">${player} won in ${num} moves</h2>`);
        // }

    }

    start.click( function () {
        turnInfo.prepend('<h5 id="player1Turn">Player 1 Turn</h5>');
        squares.click(playerTurn);
    });

    //reset squares to empty
    reset.click(() => {
        squares.html("");
    });








});



