//Global Variables
var canvas, ctx, width, height;
var lsrc = ["images/l1.png","images/l2.png","images/l3.png"];
var lrs = [];
var spritemap;
var luke;
var enemies = []; 

//Objects
function Ship(x,y,sz,sp,r,pch,m){
	this.x = x;
	this.y = y;
	this.sz = sz;
	this.sp = sp;
	this.m = m;
	this.r = r;
	this.pch = pch;
	this.die = false;
	this.update = function(){
		for (var i =0; i < this.m.length; i++){
				if(this.m[i]){
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
		if(this.pch ==1){
			if(this.y > height){	
				this.die = true;
			}	
		}else{
			if(this.x+this.sz < 0) this.x = width;
			if(this.x > width) this.x = -this.sz;
			if(this.y+this.sz < 0) this.y = height;
			if(this.y > height) this.y = -this.sz;	
		}	
	}
	this.render = function(){
	
		ctx.drawImage(spritemap, this.r * this.sz, this.pch * this.sz, 
		this.sz, this.sz, this.x, this.y, this.sz, this.sz);
		
	}
}

function Layer (img){
	this.img = img;
	this.x = 0;
	this.y = 0;
	this.w = 900;
	this.h = 2000;
	this.update = function(s){
		
		if(this.y + this.h < 0) this.y = 0;
		else this.y -= s+1;
		
		
	}
	this.render = function(){
		
		ctx.drawImage(this.img,0,0,this.w, this.h, this.x, this.y, this.w, this.h);
		ctx.drawImage(this.img,0,0,this.w, this.h, this.x, this.y + this.h, this.w, this.h);

	}
}

// Functions
	function clear(){
		ctx.clearRect(0,0,width, height);
		
	}
	function game(){
		clear()
		for(var i = 0; i < lrs.length; i++){
			lrs[i].update(i);
			lrs[i].render();
		}
		
		
		for(var e = 0; e < enemies.length; e++){
			 enemies[e].update();
			 enemies[e].render();
		}	
		luke.update();
		luke.render();
			
		for(var d = 0; d < enemies.length; d++){
			if(enemies[d].die){
				enemies.splice(d,1);
				d--;
			}
			
		}	
		
	
	}
//Init
$(document).ready(function(){
	canvas = document.getElementById("scene");
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;

	spritemap = new Image();
	spritemap.src= "images/smap.png";
	
	luke = new Ship( width/2, height/2, 64, 12, 0, 0, [false,false,false,false]);
	
	for(var i = 0; i < lsrc.length; i++){
		var img = new Image();
		img.src = lsrc[i];
		lrs.push(new Layer(img));	
	}
	
	$(document).keydown(function( evt ){
		
		switch( evt.keyCode ){
			case 37:
				luke.r = 2;
				luke.m[luke.r] = true;
			break;
			case 38:
				luke.r = 0;
				luke.m[luke.r] = true;
			break;
			case 39:
				luke.r = 3;
				luke.m[luke.r] = true;
			break;
			case 40:
				luke.r = 1;
				luke.m[luke.r] = true;
			break;
		}
		
	});
	$(document).keyup(function( evt ){
		switch( evt.keyCode ){
			case 37:
				luke.m[2]= false;
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
		}	
	});
	setInterval(function(){
		var ran = Math.random();
		if (ran > 0.6){
			enemies.push(new Ship(Math.random()*width,-100,64,20,1,1,[false,true, false, false]));	//x,y,sz,sp,r,pch,m
		}
			console.log(enemies);
	},1000);
	
	setInterval(game, 60);

});