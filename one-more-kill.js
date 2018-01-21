// Startup

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var move = 0;
var speed = 3;
var maxRadius = 30;
var mouseToCircle = 120; // distance from mouse to circle to instantiate radius growing

var key = 'None'
var mouse = {
    x: canvas.width/2,
    y: canvas.height/2
}
var player = {
    x: canvas.width/2,
    y: canvas.height/2,
    width: 50,
    height: 50,
    radians: 0,
}
var key = ['W', 'A', 'S', 'D'];
var pressed_key = ['','','',''];

var lastLoop = performance.now();
var fpsInterval = lastLoop;
var fpsDisplay = 0;

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

addEventListener('keydown', event => {
    for(let i=0;i<key.length;i++){
        if(event.code == 'Key'+key[i]){
            pressed_key[i] = event.code
        }
    }
})

addEventListener('keyup', event => {
    for(let i=0;i<key.length;i++){
        if(event.code == 'Key'+key[i]){
            pressed_key[i] = ''
        }
    }
})

//game functions
function DrawPlayer(radians){
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(radians);
    ctx.strokeRect(-player.width/4, -player.height/4, 25, 25)
    ctx.draw
    ctx.restore();
}
function Rotate(){
    player.radians = Math.atan((player.y + player.height - mouse.y)/(player.x - player.width - mouse.x));
}

function PlayerMovement(){
    for(let i=0;i<4;i++){
        if(pressed_key[i] == 'KeyW'){
            player.y -= speed;
        }
        if(pressed_key[i] == 'KeyA'){
            player.x -= speed;
        }
        if(pressed_key[i] == 'KeyS'){
            player.y += speed;
        }
        if(pressed_key[i] == 'KeyD'){
            player.x += speed;
        }
    }
}

function FpsCount() {
    var thisLoop = performance.now();
    var fps = Math.round(1000 / (thisLoop - lastLoop));
    lastLoop = thisLoop;
    if(performance.now() - fpsInterval > 500) {
        fpsDisplay = fps;
        fpsInterval = performance.now();
    }
}

function Animate() {
    FpsCount();
    requestAnimationFrame(Animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    PlayerMovement();
    ctx.font = '20px Georgia';
    ctx.fillText(fpsDisplay+' fps', 30, 100);
    DrawPlayer(player.radians);
    for(var i = 0; i < enemyArray.length; i++) {
        enemyArray[i].update();
    }
}
init();
Animate();