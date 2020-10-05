(function () {
    "use strict"
    const width = window.innerWidth;
    const height = window.innerHeight;
    const background = document.getElementById("background");
    const  ctx = background.getContext("2d");
    background.width = width;
    background.height = height;
    //position, velocity, and time variables
    const dt = 5;
    let ball= {
        r: 15,
        x: width / 2,
        y: height / 2,
        velX: .12,
        velY: .12,
    }
    let padWidth = 10;
    let padHeight = 60;
    let paddle1Y = (height/2) - (padHeight / 2);
    let paddle1X = 2;
    let paddleVel = .39;

//function to draw the circle
function drawBall(xPos, yPos, radius){
    ctx.beginPath();
    ctx.fillStyle = "#aa00ee";
    ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

//function to move circle to new position
    // position = initial position + (v * dt)
function circlePosition() {
        ball.x += (ball.velX * dt);
        ball.y += (ball.velY * dt);
}

//animate circle
function frame() {
    circlePosition();
    checkEdgeBounce();
    paddleBounce();
    checkEdge();
    clearCanvas();
    drawBall(ball.x, ball.y, ball.r);
    drawPaddle(paddle1X, paddle1Y, padWidth, padHeight);
}

    setInterval(frame, dt);

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

    function checkEdgeBounce() {
        //check top and bottom of window
        if (ball.y <= ball.r || ball.y >= height - ball.r) {
            ball.velY = -ball.velY;
            clearCanvas();
            drawBall(ball.x, ball.y, ball.r);
        }
        //check left and right
        if (ball.x <= ball.r || ball.x >= width - ball.r) {
            ball.velX = -ball.velX;
            clearCanvas();
            drawBall(ball.x, ball.y, ball.r);
        }
    }

//if ball X position of ball <= X position of the edge of the paddle + r, bounce;
    function paddleBounce() {
    //need to remove height above and below paddle.
     if ((ball.x <= padWidth + ball.r)) {
        ball.velX = -ball.velX;
    }
    }

    function drawPaddle(xPos, yPos, width, height) {
        ctx.beginPath();
        ctx.rect(xPos, yPos, width, height);
        ctx.fillStyle = "#fff";
        ctx.stroke();
        ctx.fill();

    }

    function paddlePosition() {
        paddle1Y += paddleVel;
    }

    function checkEdge() {
        if (paddle1Y <= 0) {
            paddleVel = -paddleVel
        }
        if (paddle1Y >= height - padHeight) {
            paddleVel = -paddleVel;
        }
    }

window.addEventListener("mousemove", function (e) {
    paddle1Y = e.pageY;
    frame();
    paddlePosition();
})

})();