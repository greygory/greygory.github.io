// Startup

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var move = 0;

var key = 'None'

var player = {
    x: 0,
    y: 0
}
var key = ['W', 'A', 'S', 'D'];
var pressed_key = ['','','',''];

var lastLoop = performance.now();
var fpsInterval = lastLoop;
var fpsDisplay = 0;

// Event Listeners

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
function PlayerMovement(){
    for(let i=0;i<4;i++){
        if(pressed_key[i] == 'KeyW'){
            player.y -= 10;
        }
        if(pressed_key[i] == 'KeyA'){
            player.x -= 10;
        }
        if(pressed_key[i] == 'KeyS'){
            player.y += 10;
        }
        if(pressed_key[i] == 'KeyD'){
            player.x += 10;
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
    c.clearRect(0, 0, canvas.width, canvas.height);
    PlayerMovement();
    c.font = '20px Georgia';
    c.fillText(fpsDisplay+' fps', 30, 100)
    c.fillRect(player.x, player.y, 50, 50);
    
}

Animate();