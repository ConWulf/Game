(function () {
    "use strict"
    const width = window.innerWidth;
    const height = window.innerHeight;
    const background = document.getElementById("background");
    const  ctx = background.getContext("2d");
    background.width = width;
    background.height = height;
    //position, velocity, and time variables
    const dt = 10;
    let r = 15;
    let x = width / 2;
    let y = height / 2;
    let velX = .07;
    let velY = .07;
    // let lineX = 0
    // let lineY = 550

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
        x += (velX * dt);
        y += (velY * dt);
}

//animate circle
function moveCircle() {
    circlePosition();
    checkEdgeBounce();
    clearCanvas();
    drawBall(x, y, r);
    line();
}
    // setInterval(moveCircle, dt);

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}
moveCircle();
// moveCircle();
//if edge of circle meets edge of screen, Velocity = -Velocity
    //flip velocities when ball gets to the edge of the canvas
    // function checkEdgeBounce() {
    //     if (x position === width - r) {
    //         velX = -velX;
    //     } else if (y position === height - r) {
    //         velY = -velY;
    //     }
    // }

    // TODO: figure out why the ball bounces one diameter above lower bound

    function checkEdgeBounce() {
        //check bottom of window(-y)
        if (y + (velY * y) <= r || y + (velY * y) >= height - r) {
            velY = -velY;
            clearCanvas();
            drawBall(x, y, r);
        }
        if (x + (velX * dt) <= r || x + (velX * dt) >= width - r) {
            velX = -velX;
            clearCanvas();
            drawBall(x, y, r);
        }
    }

    function line() {
        ctx.beginPath();
        ctx.moveTo(x ,y);
        ctx.lineTo(x + r, y + r);
        ctx.lineWidth = 2;
        ctx.fillStyle = "#000";
        ctx.stroke();
    }
// moveCircle();


// window.addEventListener("mousemove", function (e) {
//     x = e.pageX;
//     y = e.pageY;
//     moveCircle();
// })
})();