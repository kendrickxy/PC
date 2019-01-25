//Global Variables
var canvas, ctx, width, height, img;
var smAlpha, smScientist, smBomb;
var data = [
	{"url": "images/Wall1.png"},
	{"url": "images/Floor1.png"},
	{"url": "images/AlphaR.png"},
	{"url": "images/smScientist.png"},
	{"url": "images/smBomb.png"},
	{"url": "images/smHens.png"},
	{"url": "images/Jump.wav"},

]; 
var bcgdata  = ["images/Wall1.png","images/Floor1.png"];
var curbcg = 0;
var bcgid = 0;
var lrs = [];
var Alpha;
var RScientist = [];
var Bombs = [];
var SavHens = [];
var Score = 0;
var up = 0;
var fps = 60;
var HFloor = 800-48; //Floors height
	var now;
	var last = timestamp();
	dt = 0;
	var fpsmeter = new FPSMeter(canvas, { decimals: 0, graph: true, theme: 'dark', left: '5px' });
	var step = 1/fps;



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
			//console.log(this.y)
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
		this.x -= 10
		// WHEN HIT U GET 5 PTS
		// FINISH COLLISION SYSTEM
		// FINISH ADD POINTS SYSTEM

		var Collide = Collision (this.x,this.y,smScientist.width,smScientist.height) //bx,by,bWidth,bHeight
		//console.log(Collide)

		if(Collide == true && this.die == false){
			Score += 100
			alert("HIT SCIENCE");
			this.die = true
		}

		if(this.x < 0){
			this.die = true
		}
	}
	this.render = function() {
		ctx.drawImage(smScientist,this.x,this.y);
	}

};

function Bomb(x,y){
	this.x = x;
	this.y = y;
	this.die = false;
	this.update = function() {
		this.x -= 25
		// WHEN HITS YOU, YOU DIE
		// FINISH COLLISION SYSTEM
		// FINISH DEATH WHEN HITTING

		var Collide = Collision (this.x,this.y,smBomb.width,smBomb.height) //bx,by,bWidth,bHeight
		//console.log(Collide)

		if(Collide == true){
			alert("GAME OVER");
			this.die = true;
		}
		if(this.x < 0){
			this.die = true
		}

	};
	this.render = function() {
		ctx.drawImage(smBomb,this.x,this.y);
	};
};

function Hens(x,y) {
	this.x = x;
	this.y = y;
	this.free = false;
	this.update = function () {
		this.x -= 22
		// WHEN HIT, U GET 15 PTS
		// FINISH COLLISION SYSTEM
		// FINISH ADD POINTS SYSTEM

		var Collide = Collision (this.x,this.y,smHens.width,smHens.height) //bx,by,bWidth,bHeight
		console.log(Collide)

		if(Collide == true && this.die == false){
			Score += 300
			alert("HIT HENS");
			this.die = true
		}


		if(this.x < 0){
			this.die = true
		}
	};

	this.render = function() {
		ctx.drawImage(smHens,this.x,this.y);
	};
};



// Functions

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};


function render() {

	for(var i = 0; i < lrs.length; i++){
		lrs[i].render();
	}
	Alpha.render();
	for(var e = 0; e < RScientist.length; e++){
		RScientist[e].render();
	}

	for(var d = 0; d < Bombs.length; d++){
		Bombs[d].render();	
	}

		for(var d = 0; d < SavHens.length; d++){
			SavHens[d].render();
		}

}

function update() {

	for(var i = 0; i < lrs.length; i++){
		lrs[i].update(i);
	}
	Alpha.update();
	for(var e = 0; e < RScientist.length; e++){
		RScientist[e].update();
	}

	for(var d = 0; d < Bombs.length; d++){
		Bombs[d].update();	
	}

		for(var d = 0; d < SavHens.length; d++){
			SavHens[d].update();
		}

}



function game(){

	fpsmeter.tickStart();

	now = timestamp();
	dt = dt + Math.min(1, (now - last) / 1000);  // duration in seconds
	while(dt > step) {
    	dt = dt - step;
   		update(step);
   		render(dt);
  	}
	last = now;

//	for(var i = 0; i < lrs.length; i++){
//		lrs[i].update(i);
//		lrs[i].render();
//	}
	ctx.font = "30px Arial";
	ctx.fillText(Scoring(Score), 10, 50);
//	Alpha.update();
//	Alpha.render();
	for(var e = 0; e < RScientist.length; e++){
//		RScientist[e].update();
//		RScientist[e].render();
		if(RScientist[e].die){
			RScientist.splice(e,1);
			e--;
	}
	}

	for(var d = 0; d < Bombs.length; d++){
//		Bombs[d].update();
//		Bombs[d].render();
		if(Bombs[d].die){
			Bombs.splice(d,1);
			d--;
		}	
	}

		for(var d = 0; d < SavHens.length; d++){
//			SavHens[d].update();
//			SavHens[d].render();
		if(SavHens[d].die){
			SavHens.splice(d,1);
			d--;
		}
		}	
				fpsmeter.tick();
		
		//console.log(Alpha.y)
		requestAnimationFrame(game); // request the next frame


};


	function RandomTime(){
		var ran = Math.random();
		if (ran > 0.5)
		var Time = ran * 10000

	}

	function Scoring(S) {
		return (Math.round(S/10))
	}

	function Collision (bx,by,bWidth,bHeight){

		this.Px = Alpha.x  //Player's location x
		this.Py = Alpha.y 	//Player's location y
		this.bx = bx
		this.by = by 	//Brick
		this.bW = bWidth	//Brick's width
		this.bH = bHeight 	//Brick's height
		this.PH = smAlpha.height
		this.PW = smAlpha.width

		if (this.Px < this.bx + this.bW &&
   			this.Px + this.PW > this.bx &&
   			this.Py < this.by + this.bH &&
   			this.PH + this.Py > this.by){ // &&

			return (true)
	} else {
			return (false)
		};

		};



$(document).ready(function(){

	function scaleToWindow (){
    var gamearea = document.getElementById('wrap');
    var ratio = 100/80;
    var newWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var newHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var newratio = newWidth / newHeight;
    if(newratio > ratio){
        newWidth = newHeight * ratio;
        gamearea.style.height = newHeight+"px";
        gamearea.style.width = newWidth+"px";
    }else{
        newHeight  = newWidth / ratio;
        gamearea.style.height = newHeight+"px";
        gamearea.style.width = newWidth+"px";
    }
    gamearea.style.marginTop = (-newHeight/2)+"px";
    gamearea.style.marginLeft = (-newWidth/2)+"px";
}

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
		smHens = new Image();
		smHens.src = "images/smHens.png";
		ScaleWindow = new scaleToWindow();
		
		Alpha = new Rooster(50,HFloor-smAlpha.height,false);	//x,y,szx,szy,jmp

	for(var i = 0; i < bcgdata.length; i++){
		var img = new Image();
		img.src = bcgdata[i];
		lrs.push(new Layer(img));	
	}


	document.addEventListener('touchstart', function( evt ) {

		Alpha.jmp = true;

	});
	document.addEventListener('touchstart', function( evt ) {

				Alpha.jmp = false;
				Alpha.gld = false;

	});
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

		game();

		requestAnimationFrame(game); // start the first frame

		//setInterval(game, 50);
	});

		setInterval(function(){
		var ran = Math.random();
		if (ran > 0.6){
			RScientist.push(new Scientist(1450,HFloor-smScientist.height));	//x,y
			console.log("Scientists")
		}
	},1700);

		setInterval(function(){
		var ran = Math.random();
		if (ran > 0.6){
			Bombs.push(new Bomb(1450,HFloor-smBomb.height));	//x,y
			console.log("BOMB!")


		}
	},1600);

		setInterval(function(){
		var ran = Math.random();
		if (ran > 0.6){
			SavHens.push(new Hens(1450,HFloor-smHens.height));	//x,y
			console.log("CHIKITA!")
		}
	},2200);

});