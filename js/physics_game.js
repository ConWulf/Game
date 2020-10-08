(function () {
    "use strict"
    const width = window.innerWidth;
    const height = window.innerHeight;
    const background = document.getElementById("background");
    const  ctx = background.getContext("2d");
    background.width = width;
    background.height = height;
    const dt = 1;
    const  paddleTime = 5;
    //ball object
    let ball= {
        r: 15,
        x: width / 2,
        y: height / 2,
        velX: .8,
        velY: .5,
    };
     let paddleOne = {
        width: 13,
         height: 85,
         x: 2,
         upVel: 0,
         downVel: 0,
         topEdgeCheck: function () {
             return paddleOne.y >= 6;
        },
         bottomEdge: function () {
            return paddleOne.y <= height - (paddleOne.height + 6);
         }
    };
    let paddleTwo = {
        width: 13,
        height: 85,
        upVel: 0,
        downVel: 0,
        topEdgeCheck: function () {
            return paddleTwo.y >= 6;
        },
        bottomEdge: function () {
            return paddleTwo.y <= height - (paddleOne.height + 6);
        }
    }
    let playerOne = Number(document.getElementById("P1score").innerHTML);
    let playerTwo = Number(document.getElementById("P2score").innerHTML)
    paddleOne.y = (height/2) - (paddleOne.height/2);
    paddleTwo.y = (height/2) - (paddleTwo.height/2);
    paddleTwo.x = (width) - (paddleTwo.width + 2);

    function score() {
        if (ball.x <  ball.r) {
            playerOne += 1;
            document.getElementById("P1score").innerHTML = playerOne;
            return playerOne;
        } else if (ball.x > width - ball.r) {
            playerTwo += 1
            document.getElementById("P2score").innerHTML = playerTwo;
        }
    }

function drawBall(xPos, yPos, radius){
    ctx.beginPath();
    ctx.fillStyle = "#aa00ee";
    ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

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
    movePaddle();
    drawPaddle(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
    drawPaddle(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
}

function frame() {
    clearCanvas();
    ballFrame();
    paddleFrame();
    score();
    clearInterval();
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

    function checkEdgeBounce() {
        //check top and bottom of window
        if (ball.y <= ball.r || ball.y >= height - ball.r) {
            ball.velY = -ball.velY;
        }
    }

    // TODO: get ball to bounce off paddle
//if ball X position of ball <= X position of the edge of the paddle + r, bounce;
    //height of canvas - height of paddle = area to bounce off
    function paddleBounce() {
    if (ball.x  <= (paddleOne.height - height)) {
        ball.velX = -ball.velX;
    }

    }

    function movePaddle() {
        paddleOne.y -= (paddleOne.downVel * paddleTime);
        paddleOne.y -= (paddleOne.upVel * paddleTime);
        paddleTwo.y -= (paddleTwo.downVel * paddleTime);
        paddleTwo.y -= (paddleTwo.upVel * paddleTime);
    }

    function drawPaddle(xPos, yPos, width, height) {
        ctx.beginPath();
        ctx.rect(xPos, yPos, width, height);
        ctx.fillStyle = "#fff";
        ctx.stroke();
        ctx.fill();

    }

    function paddleStop() {
    if (paddleOne.bottomEdge()) {
        paddleOne.downVel = 0;
    } else if (paddleOne.topEdgeCheck()) {
        paddleOne.upVel = 0
    }
    }

    window.addEventListener("keydown", e => {
        switch (e.code) {
            case "KeyS":
                paddleOne.downVel = -.5;
                drawPaddle(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
                break;
            case "KeyW":
                paddleOne.upVel = .5;
                drawPaddle(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
                break;
            case "ArrowDown":
                paddleTwo.downVel = -.5;
                drawPaddle(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
                break;
            case "ArrowUp":
                paddleTwo.upVel = .5;
                drawPaddle(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
        }
        window.addEventListener("keyup", e => {
            switch (e.code) {
                case "KeyS":
                    paddleOne.downVel = 0;
                    break;
                case "KeyW":
                    paddleOne.upVel = 0;
                    break;
                case "ArrowDown":
                    paddleTwo.downVel = 0;
                    break;
                case "ArrowUp":
                    paddleTwo.upVel = 0;
            }
        })
    })
    function game() {
        var animate = setInterval(frame, dt);
        if (ball.x > width - ball.r) {
            document.location.reload();
           clearInterval(animate);
        }
    }
    game();


})();