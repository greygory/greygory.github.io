function Enemy(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.color = 'reda';
    this.follow = true;
    this.speed = Math.random()+2
    
    this.draw = function() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.lineWidth = 1;
        ctx.stroke();;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, player.y);
        ctx.lineTo(player.x, player.y);
        ctx.lineTo(this.x, this.y);
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    this.update = function() {
        if (this.x + this.radius > innerWidth || 
        this.x - this.radius < 0) {
            this.follow = false;
            this.dx = -this.dx;
        }
        else{
            this.follow = true;
        }
        if (this.y + this.radius > innerHeight || 
        this.y - this.radius < 0) {
            this.follow = false;
            this.dy = -this.dy;
        }
        else{
            this.follow = true;
        }
        this.hypotenuse = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2))
        if(this.hypotenuse > Math.random()*150+50 && this.follow == true){
            this.dx = (player.x - this.x)/(this.hypotenuse / this.speed)
            this.dy = (player.y - this.y)/(this.hypotenuse / this.speed)
        }
        
        
        this.x += this.dx;
        this.y += this.dy; 
        
        this.draw();
    }
}

var enemyArray = [];

function init() {
    enemyArray = [];
   for(var i = 0; i < 2; i++) {
    var radius = Math.random() * 10 + 5
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random()-0.5)*5;
    var dy = (Math.random()-0.5)*5;
    enemyArray.push(new Enemy(x, y, dx, dy, radius));
   } 
}