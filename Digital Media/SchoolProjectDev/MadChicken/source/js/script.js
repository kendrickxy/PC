//Global Variables
var canvas, ctx, width, height, img;
var spritemap;
var data = [
	{"url": "images/Hall2.png"},
	{"url": "images/Hall3.png"},
	{"url": "images/Hall10.png"},
	{"url": "images/Hall20.png"},
	{"url": "images/Hall30.png"},
	{"url": "images/Hall100.png"},
	{"url": "images/Hall200.png"},
	{"url": "images/Wall1.png"},
	{"url": "images/Floor1.png"},
]; 
var bcgdata  = ["images/Hall2.png","images/Hall3.png","images/Hall10.png","images/Hall20.png","images/Hall30.png","images/Hall100.png","images/Hall200.png","images/Wall1.png","images/Floor1.png"];
var curbcg = 0;
var bcgid = 0;
var lrs = [];
var CanSwitch = false;
var nxtpic = false;


function Layer (id){
	this.id = id;
	this.x = 0;
	this.y = 0;
	this.w = 800;
	this.h = 2000;
	this.update = function(s){
		
		if(this.x + this.h < 1450) this.x = 0;
		else this.x -= s+1;
		console.log(this.x + this.h)
		
	}
	this.render = function(){
		
		ctx.drawImage(this.id,0,0,this.w, this.h, this.x, this.y, this.w, this.h);
		ctx.drawImage(this.id,0,0,this.w, this.h, this.x + this.w, this.y, this.w, this.h);

	}
}

// Functions

	function clear(){
		ctx.clearRect(0,0,width,height);
	};
	function game(){
		clear()
		for(var i = 0; i < lrs.length; i++){
			lrs[i].update(i);
			lrs[i].render();
		}

	};

	function WorldChange(){

		if (curbcg < 2 && CanSwitch == true) {
		
		curbcg = curbcg + 1;
		}
		else curbcg = 0;
		CanSwitch = false;
		
		//console.log(curbcg)
		



	};
	function RandomTime(){
		var ran = Math.random();
		if (ran > 0.5)
		var Time = ran * 10000

	}

	function Loadbcg(i) {
		var img = 0
		img.src = bcgdata[curbcg][i];
		lrs.push(new Layer(i));
		console.log(i)

	}

$(document).ready(function(){
	Store.loaddata(data).then(function(){
    	canvas = document.getElementById('scene');
    	ctx = canvas.getContext('2d');
		width = window.innerWidth;
		height = window.innerHeight;
	for(var i = 0; i < bcgdata.length; i++){
		var img = new Image();
		img.src = bcgdata[i];
		lrs.push(new Layer(img));	
	}

		setInterval(game, 50);
	});

});

