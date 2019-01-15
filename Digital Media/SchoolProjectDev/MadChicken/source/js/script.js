//Global Variables
var canvas, ctx, width, height, img;
var smAlpha, smScientist, smBomb;
var data = [
	{"url": "images/Wall1.png"},
	{"url": "images/Floor1.png"},
	{"url": "images/AlphaR.png"},
	{"url": "images/smScientist.png"},
	{"url": "images/smBomb.png"},
]; 
var bcgdata  = ["images/Wall1.png","images/Floor1.png"];
var curbcg = 0;
var bcgid = 0;
var lrs = [];
var Alpha;
var RScientist = [];
var Bombs = [];
var Score = 0;
var up = 0;
var HFloor = 800-48; //Floors height


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
		//console.log(Score)
		
	}
	this.render = function(){
		
		ctx.drawImage(this.id,0,0,this.w, this.h, this.x, this.y, this.w, this.h);
		ctx.drawImage(this.id,0,0,this.w, this.h, this.x + this.w, this.y, this.w, this.h);

	}
}


function Rooster (x,y,jmp){
	this.x = x
	this.y = y;
	this.die = false;
	this.jmp = false; //Check if he's falling
	this.gld = false; //Check if he's Glyding (meaning that when he reached 150 pix and falls)
	this.fall = false;
	this.update = function() {

			// animations and jumping system will be updated HERE
		if(this.jmp == true && this.gld == false && this.fall == false){
			up = -50;
			this.y += up;
			
			//console.log(this.y)
		}

		else if(this.y < 495 && this.gld == false){
				up = 30;
				this.y += up;
				this.jmp = false;
				this.fall = true;


			}

		else if(this.y > 494){ 
				this.y = 495;
				up = 0;
				this.gld = false;
				this.fall = false;
				
			}

		if(this.y < 150){
			console.log(this.y)
			up = 3;
			this.y += up;
			if(this.jmp == true){
				this.gld = true;
			}
			else{
				this.gld = false;
			}
			
		}
		if(this.gld == true){
			up = 3
			this.y += up

		}
	};	
	
	this.render = function() {
		ctx.drawImage(smAlpha,this.x,this.y); //

	}

};


function Scientist(x,y){
	this.x = x;
	this.y = y;
	this.die = false;
	this.update = function() {
		this.x -= 20
	}
	this.render = function() {
		ctx.drawImage(smScientist,this.x,this.y);
	}

function Bomb(x,y){
	this.x = x;
	this.y = y;
	this.die = false;
	this.update = function() {
		this.x -= 50
	};
	this.render = function() {
		ctx.drawImage(smBomb,this.x,this.y);
	};
};

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
		for(var e = 0; e < RScientist.length; e++){
			RScientist[e].update();
			RScientist[e].render();
		}

		for(var d = 0; d < Bombs.length; d++){
			Bombs[d].update();
			Bombs[d].render();
		}	
		
		console.log(Alpha.y)

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
		smAlpha = new Image();
		smAlpha.src= "images/AlphaR.png";
		smScientist = new Image();
		smScientist.src ="images/smScientist.png";
		smBomb = new Image();
		smBomb.src = "images/smBomb.png";
		
		Alpha = new Rooster(50,HFloor-256,false);	//x,y,szx,szy,jmp

	for(var i = 0; i < bcgdata.length; i++){
		var img = new Image();
		img.src = bcgdata[i];
		lrs.push(new Layer(img));	
	}

	$(document).keydown(function( evt ){
		
		switch( evt.keyCode){
			case 32:
				Alpha.jmp = true;
			break;
			case 38:
				Alpha.jmp = true;
			break;
		}
		
	});
	$(document).keyup(function( evt ){
		switch( evt.keyCode){
			case 32:
				Alpha.jmp = false;
				Alpha.gld = false
			break;
			case 38:
				Alpha.jmp = false;
				Alpha.gld = false
			break;
		}	
	});

		setInterval(game, 50);
	});

		setInterval(function(){
		var ran = Math.random();
		if (ran > 0.6){
			RScientist.push(new Scientist(1450,HFloor-128));	//x,y
			console.log("loading")
		}
	},1500);

		setInterval(function(){
		var ran = Math.random();
		if (ran > 0.6){
			Bombs.push(new Bomb(1450,HFloor-128));	//x,y
			console.log("BOMB!")
		}
	},1500);

});
