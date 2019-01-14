//Global Variables
var canvas, ctx, width, height, img;
var spritemap;
var data = [
	{"url": "images/Wall1.png"},
	{"url": "images/Floor1.png"},
	{"url": "images/AlphaR.png"},
]; 
var bcgdata  = ["images/Wall1.png","images/Floor1.png"];
var curbcg = 0;
var bcgid = 0;
var lrs = [];
var Alpha;
var Score = 0;


function Layer (id){
	this.id = id;
	this.x = 0;
	this.y = 0;
	this.w = 800;
	this.h = 2000;
	this.update = function(s){
		
		if(this.x + this.h < 1450) {
			this.x = 0;
			Score += s+2;
		}
		else {
			this.x -= s+2;
			Score += s+2;
		}
		console.log(Score)
		
	}
	this.render = function(){
		
		ctx.drawImage(this.id,0,0,this.w, this.h, this.x, this.y, this.w, this.h);
		ctx.drawImage(this.id,0,0,this.w, this.h, this.x + this.w, this.y, this.w, this.h);

	}
}


function Rooster (x,y,szx,szy,jmp,){
	this.x = x
	this.y = y;
	this.szx = szx;
	this.szy = szy;
	this.die = false;
	this.update = function() {

			// animations and jumping system will be updated HERE

	}

	this.render = function() {
		ctx.drawImage(spritemap,this.x,this.y); //img,x,y,szx,szy

	}

};






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
		ctx.font = "30px Arial";
		ctx.fillText(Scoring(Score), 10, 50);
		Alpha.update();
		Alpha.render();

	};
		

	function RandomTime(){
		var ran = Math.random();
		if (ran > 0.5)
		var Time = ran * 10000

	}

	function Scoring(S) {
		return (Math.round(S/100))
	}



$(document).ready(function(){
	Store.loaddata(data).then(function(){
    	canvas = document.getElementById('scene');
    	ctx = canvas.getContext('2d');
		width = window.innerWidth;
		height = window.innerHeight;
		spritemap = new Image();
		spritemap.src= "images/AlphaR.png";
		
		Alpha = new Rooster( 50,496, 64); //img,x,y,szx,szy
	for(var i = 0; i < bcgdata.length; i++){
		var img = new Image();
		img.src = bcgdata[i];
		lrs.push(new Layer(img));	
	}

		setInterval(game, 50);
	});

});

