$(document).ready(() => {
    "use strict";

    let squares = $('.playSquares')
    let player1 = true;
    let boardObj = {
        topLeft: $('#squareTl'),
        topMiddle: $('#squareTm'),
        topRight: $('#squareTr'),
        middleLeft: $('#squareMl'),
        Middle: $('#squareM'),
        middleRight: $('#squareMr'),
        bottomLeft: $('#squareBl'),
        bottomMiddle: $('#squareBm'),
        bottomRight: $('#squareBr'),
    }
    let reset = $("#resetButton");

    //check if square is empty and player turn;
    function playerTurn () {
        if ($(this).html().length < 1) {
            if (player1) {
                $(this).html("&cross;");
                player1 = false;
            } else {
                $(this).html("&xcirc;");
                player1 = true;
            }
        }
    }

    function checkWin (l, m, r) {

    }

    squares.click(playerTurn);

    //reset squares to empty
    reset.click(() => {
        squares.html("");
    });








});



