//------------------------- global variables ------------------------
var canvas, ctx;
var mycircle;
var width;
var height;


//------------------------- game objects ----------------------------

function Circle(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
}

//------------------------- draw functions --------------------------

function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawcircle(ctx, x, y, radius) { // draw circle function
    ctx.fillStyle = 'rgba(255, 0, 255, 1.0)';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function drawscene() { // main drawScene function
    clear(); // clear canvas
	
	drawcircle(ctx, mycircle.x, mycircle.y, mycircle.radius); //draw crcle
}



//------------------------- initialization --------------------------

$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');
	
	
	width = canvas.width;
    height = canvas.height;
	
	
	//crcle properties
	var circleradius = 15;
	var x = Math.random()*width;
    var y = Math.random()*height;
	
	mycircle = new Circle(x,y,circleradius); //creatng an instance of game object Circle
							  
 	setInterval(drawscene, 30); // loop drawScene
	});