var canvas, context;

canvas = document.getElementById("gameCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
context = canvas.getContext("2d");
ctx = context

function blackout_screen(){
    ctx.fillStyle = '#000000';
    ctx.fillRect( 0, 0, canvas.width, canvas.height);
  }

class Pheromone {
    constructor(){
        this.map = new Array(canvas.width);
        for (let i = 0; i < canvas.width; i++) {
            this.map[i] = new Array(canvas.height).fill(0);
        }

        for (let j = 0; j < canvas.width; j++) {
            this.map[j][j] = 1
        }
    }

    draw() {
        ctx.fillStyle = '#FFFFFF'
        for (let i = 0; i < canvas.width; i++){
            for (let j = 0; j < canvas.height; j++) {
                if (this.map[i][j] == 1) {
                    ctx.fillRect( i, j, 1, 1);
                }
            }
        }

    }
}






class Ant {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = 2
        this.direction = 45
        this.speed = 1
    }

    move(){
        var movx = this.speed * Math.cos(this.direction * (Math.PI/180));
        var movy = this.speed * Math.sin(this.direction * (Math.PI/180));
        this.x = this.x + movx
        this.y = this.y + movy
    }

    draw() {

        draw_circle(this.x, this.y, this.radius)

    }
}


function draw_circle(x, y, r){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    ctx.fillStyle = '#FF00FF';
    ctx.fill();
}

let ants = []

for (let i = 0; i < 50; i++){
    ants.push( new Ant(i * 2, 10))
}

pheromone = new Pheromone()



var basetime = Date.now();
var fps = 1000/600;

function animate_handler() {
    var now   = Date.now();
    var check = now - basetime;
    if( check / fps >= 1 ) {
        basetime = now;
        draw();
    }
    requestAnimationFrame( animate_handler, fps );
}

function draw() {
    // blackout_screen()
    for (let i = 0; i < ants.length; i++){
        ants[i].move()
        ants[i].draw()
    }
    
    // pheromone.draw()

}

animate_handler();