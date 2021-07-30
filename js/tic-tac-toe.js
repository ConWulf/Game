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
    let nextPlayer;
    let playerWon;
    let setRowStyle = {backgroundColor: "#059",
        color: "#789",
        backgroundImage: 'linear-gradient(#789, #789)',
        backgroundSize: "100% 3px",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }

    let setColumnStyle = {backgroundColor: "#059",
        color: "#789",
        backgroundImage: 'linear-gradient(#789, #789)',
        backgroundSize: "3px 100%",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }


    let revertStyle = {backgroundColor: "revert",
        color: "revert",
        backgroundImage: 'revert',
        }

    //check if square is empty and player turn;
    function playerTurn () {
            if (player1) {
                $(this).html("&cross;");
                $(this).off();
                player1 = false;
                nextPlayer = "Player 2"
                playerWon = "Player 1"
            } else {
                $(this).html("&xcirc;");
                $(this).off();
                player1 = true;
                nextPlayer = "Player 1"
                playerWon = "Player 2"
            }
        turnCount++
        showTurn();
        checkTopRow(boardObj, turnCount, playerWon);
        checkMiddleRow(boardObj, turnCount, playerWon);
        checkBottomRow(boardObj, turnCount, playerWon);
        checkLeftColumn(boardObj, turnCount, playerWon);
        checkMiddleColumn(boardObj, turnCount, playerWon);
        checkRightColumn(boardObj, turnCount, playerWon);
    }

    function showTurn() {
        turnInfo.html("");
        if (player1) {
            turnInfo.prepend(`<h5 id="player1Turn">${nextPlayer}'s Turn</h5>`);
            $('#player2Turn').html("");
        } else {
            turnInfo.prepend(`<h5 id="player2Turn">${nextPlayer}'s Turn</h5>`);
            $('#player1Turn').html( "");
        }
    }

    // function checkTopRow(obj, num, player) {
    //     $('.win').html("");
    //     if (obj.topRow[0].innerHTML === "✗" && obj.topRow[1].innerHTML === "✗" && obj.topRow[2].innerHTML === "✗") {
    //         winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
    //         obj.topRow.css(setRowStyle);
    //         squares.off();
    //     } else if (obj.topRow[0].innerHTML === "◯" && obj.topRow[1].innerHTML === "◯" && obj.topRow[2].innerHTML === "◯") {
    //         winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
    //         obj.topRow.css(setRowStyle);
    //         squares.off();
    //     }
    // }

    function checkTopRow(obj, num, player) {
        $('.win').html("");
            obj.topRow.each(function () {
                console.log($(this).html().length > 0);
                if ($(this).html() === "✗") {
                    winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
                    obj.topRow.css(setRowStyle);
                    squares.off();
                }
            })
    }

    function checkMiddleRow(obj, num, player) {
        if (obj.middleRow[0].innerHTML === "✗" && obj.middleRow[1].innerHTML === "✗") {
            if (obj.middleRow[2].innerHTML === "✗") {
                winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
                obj.middleRow.css(setRowStyle);
                squares.off();
            } else if (obj.middleRow[0].innerHTML === "◯" && obj.middleRow[1].innerHTML === "◯" && obj.middleRow[2].innerHTML === "◯") {
                winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
                obj.middleRow.css(setRowStyle);
                squares.off();
            }
        } else if (obj.middleRow[0].innerHTML === "◯" && obj.middleRow[1].innerHTML === "◯" && obj.middleRow[2].innerHTML === "◯") {
            winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
            obj.middleRow.css(setRowStyle);
            squares.off();
        }
    }

    function checkBottomRow(obj, num, player) {
        if (obj.bottomRow[0].innerHTML === "✗" && obj.bottomRow[1].innerHTML === "✗" && obj.bottomRow[2].innerHTML === "✗") {
            winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
            obj.bottomRow.css(setRowStyle);
            squares.off();
        } else if (obj.bottomRow[0].innerHTML === "◯" && obj.bottomRow[1].innerHTML === "◯" && obj.bottomRow[2].innerHTML === "◯") {
            winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
            obj.bottomRow.css(setRowStyle);
            squares.off();
        }
    }

    function checkLeftColumn(obj, num, player) {
        if (obj.topRow[0].innerHTML === "✗" && obj.middleRow[0].innerHTML === "✗" && obj.bottomRow[0].innerHTML === "✗") {
            winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
            squares.off();
        } else if (obj.topRow[0].innerHTML === "◯" && obj.middleRow[0].innerHTML === "◯" && obj.bottomRow[0].innerHTML === "◯") {
            winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
            squares.off();
        }
    }

    function checkMiddleColumn(obj, num, player) {
        if (obj.topRow[1].innerHTML === "✗" && obj.middleRow[1].innerHTML === "✗" && obj.bottomRow[1].innerHTML === "✗") {
            winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
            squares.off();
        } else if (obj.topRow[1].innerHTML === "◯" && obj.middleRow[1].innerHTML === "◯" && obj.bottomRow[1].innerHTML === "◯") {
            winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
            squares.off();
        }
    }

    function checkRightColumn(obj, num, player) {
        if (obj.topRow[2].innerHTML === "✗" && obj.middleRow[2].innerHTML === "✗" && obj.bottomRow[2].innerHTML === "✗") {
            winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
            squares.off();
        } else if (obj.topRow[2].innerHTML === "◯" && obj.middleRow[2].innerHTML === "◯" && obj.bottomRow[2].innerHTML === "◯") {
            winTittle.append(`<h2 class="win">${player} won in ${num} moves</h2>`);
            squares.off();
        }
    }

    //start game, but only allow one click
    start.one("click", function () {
        turnInfo.prepend(`<h5 class="player1Turn">Player 1's Turn</h5>`)
        squares.click(playerTurn);
    });


    //reset game
    reset.on("click", function() {
        squares.click(playerTurn);
            let win = $('.win');
            win.html("");
            squares.html("");
            turnCount = 0;
            squares.css(revertStyle)
    });











});



