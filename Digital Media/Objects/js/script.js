// 	Global Variables
var canvas, ctx, width, height, balls = [], no = 50000;

//	Objects
function Ball(x,y,r,c,sx,sy) {

	this.x = x;
	this.y = y;
	this.r = r;
	this.c = c;
	this.sx = sx;
	this.sy = sy;
	this.update = function () {

		if(this.x - this.r < 0 || this.x + this.r > width )  this.sx = -this.sx;
		if(this.y - this.r < 0 || this.y + this.r > height ) this.sy = -this.sy;
		this.x += this.sx;
		this.y+= this.sy;
	}
	this.render = function () {
		ctx.beginPath();
		ctx.fillStyle = this.c;
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		ctx.fill()
		ctx.closePath()


	}
};


//	Functions
	function clear() {
		ctx.clearRect(0,0,width,height);
	};

	function game() {
		//clear
		clear();

		for(
			var i = 0,
			l = balls.length;
		 i< l;
		 i++) {

			balls[i].update();
			balls[i].render();
		}
		//update
		
		//render
		

	}

//	Init
$(document).ready(function(){

	canvas = document.getElementById("scene");
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;

	for(var i = 0; i < no; i++) {

		var x = Math.random() * width;
		var y = Math.random() * height;
		var r = (Math.random() * 45) + 5
		var sx = (Math.random() * 20) - 10;
		var sy = (Math.random() * 20) - 10;

		var cr = Math.round(Math.random() * 255);
		var cg = Math.round(Math.random() * 255);
		var cb = Math.round(Math.random() * 255);


		balls.push(new Ball(x,y,r,"rgb("+cr+","+cg+","+cb+")",sx,sy) );

	}

	setInterval(game,60);

});