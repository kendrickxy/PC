// 	Global Variables
var canvas, ctx, width, height;
var lsrc = ["media/l1.png","media/l4.png","media/l2.png"];
var lrs = [];
var spritemap;
var luke;
var enemies = [];
var bullets = [];
var count = 0

//	Objects
function Bullet(x,y,sz,sp) {
	this.x = x;
	this.y = y;
	this.sz = sz;
	this.sp = sp;
	this.die = false;
	this.pch = 0;
	this.r = 0
	this.update = function () {

		if(this.r == 0) this.y -= this.sp;
		else if(this.r == 1) this.y += this.sp;
		else if(this.r == 2) this.x -= this.sp;
		else if(this.r == 3) this.x += this.sp;

		if(this.x + this.sz>0 || this.x > width || this.y + this.sz < 0 || this.y > height) this.die = true;

		if(this.pch == 0) {
			for(var i =0 ,l = enemies.length; i < l; i++) {
				var e =enemies[i];
				if(!e.die)

				if(this.x>e.x && this.x > e.x+e.sz && this.y > e.y && this.y < e.y + e.s)
					e.die = true;
					this.die = true;
			}
		}

	}
	this.render = function() {

		ctx.drawImage(spritemap, 0, 128, this.sz, this.sz, this.x, this.y, this.sz, this.sz);

	}

}



function Ship (x,y,sz,sp,r,pch,m) {
	this.x = x;
	this.y = y;
	this.sz = sz;
	this.sp = sp;
	this.m = m;
	this.r = r; 
	this.pch = 0;
	this.die = false;
	this.update = function () {

		for(var i = 0; i < this.m.length; i++) {

			if(this.m[i]) {
				switch(i){

			case 0:
				this.y -= this.sp;
			break;
			case 1:
				this.y += this.sp;
			break;
			case 2:
				this.x -= this.sp;
			break;
			case 3:
				this.x += this.sp;
			break;

				}
			}

		}

	}

	if (this.pch == 1) {
		if(this.y > height) {
			this.die = true;
		}
	}else{
		if (this.x+this.sz < 0) this.x = width;
		if(this.x > width) this.x = -this.sz;
		if (this.y+this.sz < 0) this.y = height;
		if(this.y > width) this.y = -this.sz;
	}


	this.render = function () {

		ctx.drawImage(spritemap, this.r * this.sz, this.pch * this.sz, this.sz, this.sz, this.x, this.y, this.sz, this.sz);


	}
}

function Layer (img){
	this.img = img;
	this.x = 0;
	this.y = 0;
	this.w = 900;
	this.h = 2000
	this.update = function(img){

		if(this.y+this.h < 0) this.y = 0;
		else this.y -= img+5;

	

	}
	this.render = function() {

		ctx.drawImage(this.img,0,0,this.w, this.h, this.x, this.y, this.w, this.h);
			ctx.drawImage(this.img,0,0,this.w, this.h, this.x, this.y+this.h, this.w, this.h);
	}

}


//	Functions
	function clear() {
		ctx.clearRect(0,0,width,height);
	};

	function game() {
		//clear
		clear();
		//update
		for (var i = 0; i<lrs.length; i++) {
			lrs[i].update(i);
			lrs[i].render();
		}

		for (var e = 0; e<enemies.length; e++) {
			enemies[e].update(e);
			enemies[e].render();
		}

		for(var b = 0; b < bullets.length; b++) {
			bullets[b].update(b);
			bullets[b].render();
		}

		luke.update();
		luke.render();


		for(var d = 0; d< enemies.length; d++) {
			if(enemies[d].die){
				enemies.splice(d,1);
				d--;
			}

		}

		for(var rb = 0; rb< bullets.length; rb++) {
			if(bullets[rb].die){
				bullets.splice(rb,1);
				d--;
			
			}


			

		
		}
	}
//	Init

$('#canvas').css('width', '100%');

$(window).resize(function(){
   $('#canvas').height($('#canvas').width() / 2.031);
});

$(document).ready(function(){

	canvas = document.getElementById("scene");
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	spritemap = new Image();
	spritemap.src = "media/Sprite_Planes.png";

	luke = new Ship(width/2, height/2, 64, 30, 0, 0,[false,false,false,false]);

	for(var i = 0; i < lsrc.length; i++) {
		var img = new Image(); 
		img.src = lsrc [i];
		lrs.push(new Layer(img));
	}

	$ (document).keyup(function( evt ){

		switch( evt.keyCode ){
			
			case 37:
				luke.m[2] = false;
			break;
			case 38:
				luke.m[0] = false;
			break;
			case 39:
				luke.m[3] = false;
			break;
			case 40:
				luke.m[1] = false;
			break;

	};
	});

	$ (document).keydown(function( evt ){

		switch( evt.keyCode ){
			
			case 37:
				luke.r = 2
				luke.m[luke.r] = true;
			break;
			case 38:
				luke.r = 0
				luke.m[luke.r] = true;
			break;
			case 39:
				luke.r = 3
				luke.m[luke.r] = true;
			break;
			case 40:
				luke.r = 1
				luke.m[luke.r] = true;
			break;
			case 32:
				bullets.push(new Bullet (luke.x,luke.y,10,15)); //x,y,sz,sp
				console.log(bullets)

	};

	});

	setInterval(function(){
		var ran = Math.random();
		if (ran > 0.6) { 
			enemies.push(new Ship (Math.random()*width,-100,64,15,1,1,[false,true,false,false])); //x,y,sz,sp,r,pch,m
		}
			//console.log(enemies);
	},2000)

	setInterval(game,60);

});