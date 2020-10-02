(function () {
    "use strict"
    const width = window.innerWidth;
    const height = window.innerHeight;
    const background = document.getElementById("background");
    const  ctx = background.getContext("2d");
    background.width = width;
    background.height = height;
    const dt = 10;
    let r = 10;
    let x = 100;
    let y = 100;
    let velX = .1;
    let velY = .2;

//function to draw the circle
function drawBall(x, y, r){
    ctx.beginPath();
    ctx.fillStyle = "#aa00ee";
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}
//function to move circle to new position
    // position = initial position + (v * dt)
function circlePosition() {
        x += (velX * dt);
        y += (velY * dt);
        drawBall(x, y, r);
}

//animate circle
function moveCircle() {
    setInterval(circlePosition, dt);

}

moveCircle();

})();