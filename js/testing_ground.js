(function () {

"use strict"
const width = window.innerWidth;
const height = window.innerHeight / 2;
const background = document.getElementById("background");
const ctx = background.getContext("2d");
background.width = width;
background.height = height;
const dt = 6;
let ball = {
    r: 20,
    x: 40,
    velX: .9,
    velY: .9
}
ball.y = height - ball.r - 1;

function drawBall(xPos, yPos, radius) {
    ctx.beginPath();
    ctx.fillStyle = "#aa6600";
    ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

    function clearCanvas(){
    ctx.clearRect(0, 0, width, height);
    }


    // function checkBounce() {
    //     if (ball.y <= height - (height/2.5)) {
    //         ball.velY = -ball.velY;
    //     }
    //     if (ball.y >= height - ball.r) {
    //         ball.velY = -ball.velY;
    //     }
    // }

    function checkSides() {
        if (ball.x <= ball.r || ball.x >= width - ball.r) {
            ball.velX = -ball.velX;
        }
    }

    function moveBall() {
        ball.x += (ball.velX * dt);
        ball.y -= (ball.velY * dt);
        clearCanvas();
        checkBounce();
        checkSides();
        drawBall(ball.x, ball.y, ball.r);
    }

    drawBall(ball.x, ball.y, ball.r);
  window.addEventListener("keyup", function (e) {
        if (e.code === "Space" ) {
            do {
            moveBall();
            } while (ball.y <= height - (height/2.5))
            // setInterval(moveBall, dt);
        }
    });


})();