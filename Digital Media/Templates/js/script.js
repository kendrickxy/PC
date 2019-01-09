// 	Global Variables
var canvas, ctx, width, height;

//	Objects
function Ball(x,y,r,c,sx,sy) {

	this.x = x;
	this.y = y;
	this.r = r;
	this.c = c;
	this.sx = sx;
	this.sy = sy;
	this.update = function () {

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
		//update
		hero.update();
		//render
		here.render();

	}

//	Init
$(document).ready(function(){

	canvas = document.getElementById("scene");
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	here = new Ball(100,100,60,"green",6,8);

	setInterval(game,60);

});