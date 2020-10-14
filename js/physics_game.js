(function () {
    "use strict"
    const width = window.innerWidth ;
    const height = window.innerHeight;
    const background = document.getElementById("background");
    const  ctx = background.getContext("2d");
    background.width = width;
    background.height = height;
    const dt = 1;
    const  paddleTime = 5;
    let ball= {
        r: 5,
        x: width / 2,
        y: height / 2,
        velX: .6,
        velY: .6,
    };
     let paddleOne = {
        width: 13,
         height: 85,
         x: 2,
         upVel: 0,
         downVel: 0,
         topEdgeCheck: function () {
             return this.y <= 6;
        },
         bottomEdge: function () {
            return this.y >= height - (this.height);
         }
    };
    let paddleTwo = {
        width: 13,
        height: 85,
        upVel: 0,
        downVel: 0,
        topEdgeCheck: function () {
            return this.y <= 6;
        },
        bottomEdge: function () {
            return this.y >= height - (this.height );
        }
    }
    paddleOne.y = (height/2) - (paddleOne.height/2);
    paddleTwo.y = (height/2) - (paddleTwo.height/2);
    paddleTwo.x = (width) - (paddleTwo.width + 2);
    let playerOne = parseInt(document.getElementById("P1score").innerHTML);
    let playerTwo = parseInt(document.getElementById("P2score").innerHTML)


    function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }


    function p1Score() {
        if (ball.x <  ball.r) {
            playerOne += 1;
            document.getElementById("P1score").innerHTML = playerOne;
        }
    }

    function p2Score() {
        if (ball.x > width - ball.r) {
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
    paddleBounce();
    checkEdgeBounce();
    drawBall(ball.x, ball.y, ball.r);
}

function paddleFrame() {
    movePaddle();
    leftPaddleCheck();
    rightPaddleCheck();
    drawPaddle(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
    drawPaddle(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
}

function frame() {
    clearCanvas();
    ballFrame();
    paddleFrame();
    p1Score();
    p2Score();
    reset();
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

function reset() {
 if (ball.x <= ball.r  || ball.x  >= (width - ball.r)) {
        ball.x = width/2;
        ball.y = height/2;
     if (random(0, 4) === 0) {
         ball.velX = -ball.velX;
     } else if (random(0, 4 === 1)) {
         ball.velY = -ball.velY;
     } else if (random(0, 4) === 2){
         ball.velX = -ball.velX;
         ball.velY = -ball.velX;
     }
    }

}

    function checkEdgeBounce() {
        if (ball.y <= ball.r || ball.y >= height - ball.r) {
            ball.velY = -ball.velY;
        }
    }

    function paddleBounce() {
        if ((ball.x  <= paddleOne.x + paddleOne.width + ball.r) && (ball.y >= paddleOne.y) && (ball.y  <= paddleOne.y + paddleOne.height)) {
            ball.velX = -ball.velX;
        }
        if ((ball.x >= paddleTwo.x - paddleTwo.width + 1) && (ball.y >= paddleTwo.y) && (ball.y <= paddleTwo.y + paddleTwo.height)) {
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

    function leftPaddleCheck () {
        if (paddleOne.bottomEdge()) {
            paddleOne.downVel = 0;
        } else if (paddleOne.topEdgeCheck()) {
            paddleOne.upVel = 0
        }
    }

    function rightPaddleCheck () {
        if (paddleTwo.bottomEdge()) {
            paddleTwo.downVel = 0;
        } else if (paddleTwo.topEdgeCheck()) {
            paddleTwo.upVel = 0
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
        leftPaddleCheck();
        rightPaddleCheck();
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
        // setInterval(frame, dt);

    window.addEventListener("mousemove", e => {
        ball.x = e.pageX;
        ball.y = e.pageY;
        clearCanvas();
        drawBall(ball.x, ball.y, ball.r);
        drawPaddle(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
        drawPaddle(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
    });
})();