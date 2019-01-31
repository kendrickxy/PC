//Global Variables
var canvas, ctx, width, height, img;
var smAlpha, smScientist, smBomb, TWall, TFloor;
var data = [
	{"url":"images/Wall1.png"},
	{"url":"images/Floor1.png"},
	{"url":"images/AlphaR.png"},
	{"url":"images/smScientist.png"},
	{"url":"images/smBomb.png"},
	{"url":"images/smHens.png"},
	{"url":"sound/Jump.wav"},	
	{"url":"sound/Scream1.wav"},
	{"url":"sound/Scream2.wav"},
	{"url":"sound/Scream3.wav"},
	{"url":"sound/Tap.wav"},
	{"url":"sound/Bomb.wav"},
	{"url":"sound/CluckHen.wav"},
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
var fps = 120;
var NextFrame = true;
var HFloor = 800-48; //Floors height
	var now;
	var last = timestamp(),
	dt = 0;
	var step = 1/fps;
var AnimFram;
var Spawn;
var falsy = false;
var deadchicken = false;
var SpawningScience, SpawningBomb, SpawningHens;
var PlaySFX, PlayMusic;
var LeavingGame = false;
var CanJump = true;

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
	//	console.log(Score)
		
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
		if(this.jmp == true && this.gld == false && this.fall == false){		//Jumping
			up = -50;
			this.y += up;
			PlayJump(Store.cache["sound/Jump.wav"])
			
			//console.log(this.y)
		}

		else if(this.y < 495 && this.gld == false){				//Check if he's at max height
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
		ctx.drawImage(Store.cache["images/AlphaR.png"],this.x,this.y); //

	}

};


function Scientist(x,y){
	this.x = x;
	this.y = y;
	this.die = false;
	this.prize = 100;
	this.update = function() {
		this.x -= 10
		// WHEN HIT U GET 5 PTS
		// FINISH COLLISION SYSTEM
		// FINISH ADD POINTS SYSTEM

		var Collide = Collision (this.x,this.y,smScientist.width,smScientist.height) //bx,by,bWidth,bHeight

		if(Collide == true && this.die == false){
			Score += this.prize;
		scream();
			this.die = true;
		}

		if(this.x < 0){
			this.die = true;
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
		this.x -= 20
		// WHEN HITS YOU, YOU DIE
		// FINISH COLLISION SYSTEM
		// FINISH DEATH WHEN HITTING

		var Collide = Collision (this.x,this.y,smBomb.width,smBomb.height) //bx,by,bWidth,bHeight
		//console.log(Collide)

		if(Collide == true){
			Playsound(Store.cache["sound/Bomb.wav"]);
			this.die = true;
			deadchicken = true;
		}
		if(this.x < 0){
			this.die = true;
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
	this.die = false;
	this.update = function () {
	this.prize = 350;
		this.x -= 22
		// WHEN HIT, U GET 15 PTS
		// FIX COLLISION SYSTEM
		// FINISH ADD POINTS SYSTEM

		var Collide = Collision (this.x,this.y,smHens.width,smHens.height) //bx,by,bWidth,bHeight

		if(Collide == true && this.die == false){

			Score += this.prize;
			Playsound(Store.cache["sound/CluckHen.wav"]);
			this.die = true;
		}
		else{
			console.log("NO HIT");
		};


		if(this.x < 0){
			this.die = true
		}
	};

	this.render = function() {
		ctx.drawImage(smHens,this.x,this.y);
	};
};



// Functions

function Initialize() {
	fplaySFX();
	//fplayMusic();
}


function scaleToWindow (){
    var gamearea = document.getElementById('wrap');
    var ratio = 100/80;
    var newWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var newHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var newratio = newWidth / newHeight;
    console.log(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    console.log(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);

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

function StartGame() {
		document.getElementById('StartScreen').style.display = 'none';
		document.getElementById('EndScreen').style.display = 'none';
		requestAnimationFrame(game);

		SpawningScience = setInterval(SpawnScientists,1700);

		SpawningBomb = setInterval(SpawnBombs,1600);
		
		SpawningHens = setInterval(SpawnHens,2200);
};

function OptionGame() {
	document.getElementById('OptionScreen').style.display = 'block';
}

function ReturnGame() {
	document.getElementById('OptionScreen').style.display = 'none';
}

function EndGame() {
		document.getElementById('EndScreen').style.display = 'block';
		document.getElementById("ScoreEnd").innerHTML = "Your score is: " + Scoring(Score);
		clearInterval(SpawningScience);
		clearInterval(SpawningHens);
		clearInterval(SpawningBomb);
		cancelAnimationFrame(AnimFram);
}

function QuitGame(){


	if(LeavingGame == false){
		document.getElementById('quitbtn').innerHTML = "COMFIRM";
		LeavingGame = true;
		setTimeout(function(){
			document.getElementById('quitbtn').innerHTML = "QUIT GAME";
			LeavingGame = false;
		},2000);
	}
	else {
		LeavingGame = false
		document.getElementById('quitbtn').innerHTML = "LEAVING...";
		window.location.assign("https://www.google.com")
		cancelAnimationFrame(AnimFram);
	};
};

function fplayMusic(){

  if (document.getElementById("cbmusic").checked == true){
    PlayMusic = true;
  }
  else {
    PlayMusic = false;
  }
};

function fplaySFX(){

  if (document.getElementById("cbsfx").checked == true){
    PlaySFX = true;
  }
  else {
    PlaySFX = false;
  }
};


function PlayJump(Jump){
	this.Jump = Jump;

	if(PlaySFX == true && CanJump == true) {
		this.Jump.play();
		CanJump = false;
	//	console.log(PlaySFX);
	}
	else{
		setTimeout(function(){
			CanJump = true;
		},100);
	//	console.log(PlaySFX);

	}

}


function Playsound(sound){
	this.sound = sound

	if(PlaySFX == true) {
		this.sound.play();
	//	console.log(PlaySFX);
	}
	else{
	//	console.log(PlaySFX);

	}

}

function Playmusic(music) {
		this.music = music

	if(PlayMusic == true) {
		this.music.play();
	//	console.log(PlayMusic);
	}
	else{
	//	console.log(PlayMusic);
	}

};


function Restart(){
		location.reload();
}

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};


function SpawnScientists(){
	var ran = Math.random();
	if (ran > 0.6){
		RScientist.push(new Scientist(1450,HFloor-smScientist.height));
		console.log("Scientists")
	}
};	

function SpawnBombs(){
	var ran = Math.random();
	if (ran > 0.6){
		Bombs.push(new Bomb(1450,HFloor-smBomb.height));
		console.log("BOMB!")

	}
};

function SpawnHens(){
	var ran = Math.random();
	if (ran > 0.6){
		SavHens.push(new Hens(1450,HFloor-smHens.height));
		console.log("CHIKITA!")
	}
};

function render(){

}

function update() {

			for(var i = 0; i < lrs.length; i++){
		lrs[i].update(i);
		lrs[i].render();
	}
	ctx.font = "30px Trebuchet MS";
	ctx.fillText(Scoring(Score), 10, 50);
	ctx.fillStyle = "white";
	Alpha.update();
	Alpha.render();
	for(var e = 0; e < RScientist.length; e++){
		RScientist[e].update();
		RScientist[e].render();
		if(RScientist[e].die){
			RScientist.splice(e,1);
			e--;
	}
	}

	for(var d = 0; d < Bombs.length; d++){
		Bombs[d].update();
		Bombs[d].render();
		if(Bombs[d].die){
			Bombs.splice(d,1);
			d--;
		}	
	}

		for(var d = 0; d < SavHens.length; d++){
			SavHens[d].update();
			SavHens[d].render();
		if(SavHens[d].die){
			SavHens.splice(d,1);
			d--;
		}
		}	
			Spawn = false
			//scaleToWindow();

}


function game(){
	now = timestamp();
	dt = (now - last) / 1000;  // duration in seconds
	Spawn = true
 	dt = dt - step;
	update(step);
	render(dt);
	last = now;
//	ScaleWindow()

		if(deadchicken === true) {
			EndGame();
		}
		else{
			AnimFram = requestAnimationFrame(game); // request the next frame

		}
			

};

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
		this.PH = Store.cache["images/AlphaR.png"].height
		this.PW = Store.cache["images/AlphaR.png"].width

		if (this.Px < this.bx + this.bW &&
   			this.Px + this.PW > this.bx &&
   			this.Py < this.by + this.bH &&
   			this.PH + this.Py > this.by){ // &&

			return (true)
	} else {
			return (false)
		};

		};


	function scream() {
		var ran = Math.random();
		var Screaming
		if (ran < 0.25) {

			Playsound(Store.cache["sound/Scream1.wav"]);

		}

		else if (ran >= 0.25 && ran < 0.5) {
			Playsound(Store.cache["sound/Scream2.wav"]);

		}

		else if (ran >= 0.5 && ran <= 1) {
			Playsound(Store.cache["sound/Scream3.wav"]);

		}
	};

$(function() {
   $('.button').hover( function(){
	Playsound(Store.cache["sound/Tap.wav"]);

   },
   function(){
   });
});

$(document).ready(function(){

	document.getElementById('startbtn').innerHTML = "START GAME"

	Initialize();

Store.loaddata(data).then(function(){

    	canvas = document.getElementById('scene');
    	ctx = canvas.getContext('2d');
    	smAlpha = Store.cache["images/AlphaR.png"];
		smScientist = Store.cache["images/smScientist.png"];
		smBomb = Store.cache["images/smBomb.png"];
		smHens = Store.cache["images/smHens.png"];
		TFloor = Store.cache["images/Floor1.png"];
		TWall = Store.cache["images/Wall1.png"];
		//canvas.width = 1000;
		//canvas.height = 800;
		//console.log(canvas.width)
	//	height = newHeight;
//Store.cache["images/AlphaR.png"];
//Store.cache["sound/Jump.wav"].play();
		Alpha = new Rooster(50,HFloor-smAlpha.height,false);	//x,y,szx,szy,jmp
});
	for(var i = 0; i < bcgdata.length; i++){
		var img = new Image();
		img.src = bcgdata[i];
		lrs.push(new Layer(img));	
	};


	document.addEventListener('touchstart', function( evt ) {

		Alpha.jmp = true;

	});
	document.addEventListener('touchend', function( evt ) {

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
				Alpha.gld = false;
			break;
			case 38:
				Alpha.jmp = false;
				Alpha.gld = false;
			break;
		};
	});
});