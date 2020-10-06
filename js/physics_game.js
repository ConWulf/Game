(function () {
    "use strict"
    const width = window.innerWidth;
    const height = window.innerHeight;
    const background = document.getElementById("background");
    const  ctx = background.getContext("2d");
    background.width = width;
    background.height = height;
    const dt = 5;
    const  paddleTime = 10;
    //ball object
    let ball= {
        r: 15,
        x: width / 2,
        y: height / 2,
        velX: .1,
        velY: .2,
    };
     let paddleOne = {
     width: 13,
     height: 85,
     x: 2,
     upVel: 0,
     downVel: 0,
    }
    paddleOne.y = (height/2) - (paddleOne.height/2);
//function to draw the circle
function drawBall(xPos, yPos, radius){
    ctx.beginPath();
    ctx.fillStyle = "#aa00ee";
    ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

    // final position = initial position + (v * dt)
function circlePosition() {
        ball.x += (ball.velX * dt);
        ball.y += (ball.velY * dt);
}

function ballFrame() {
    circlePosition();
    checkEdgeBounce();
    paddleBounce();
    drawBall(ball.x, ball.y, ball.r);
}

function paddleFrame() {
    drawPaddle(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
}

function frame() {
    clearCanvas();
    ballFrame();
    paddleFrame();
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

    function checkEdgeBounce() {
        //check top and bottom of window
        if (ball.y <= ball.r || ball.y >= height - ball.r) {
            ball.velY = -ball.velY;
            frame();
        }
        //check left and right
        if (ball.x <= ball.r || ball.x >= width - ball.r) {
            ball.velX = -ball.velX;
            frame();
        }
    }

//if ball X position of ball <= X position of the edge of the paddle + r, bounce;
    //height of canvas - height of paddle = area to bounce off
    function paddleBounce() {


    }

    function drawPaddle(xPos, yPos, width, height) {
        ctx.beginPath();
        ctx.rect(xPos, yPos, width, height);
        ctx.fillStyle = "#fff";
        ctx.stroke();
        ctx.fill();

    }

window.addEventListener("keydown", function (e) {
        if (e.code === "KeyS" && paddleOne.y <= height - (paddleOne.height + 10)) {
            paddleOne.downVel = 1;
            paddleOne.y += (paddleOne.downVel * paddleTime);
        } else if (e.code === "KeyW" && paddleOne.y >= 10) {
            paddleOne.upVel = 1;
            paddleOne.y -= (paddleOne.upVel * paddleTime);
        }
})
    setInterval(frame, dt);
//test
})();