//Global Variables
var canvas, ctx, width, height, img;
var spritemap;
var data = [
	{"url": "images/Hall1.png"},
	{"url": "images/Hall2.png"},
	{"url": "images/Hall3.png"},
	{"url": "images/Hall10.png"},
	{"url": "images/Hall20.png"},
	{"url": "images/Hall30.png"},
	{"url": "images/Hall100.png"},
	{"url": "images/Hall200.png"},
	{"url": "images/Hall300.png"}
]; 
var bcgdata  = [["images/Hall1.png","images/Hall2.png","images/Hall3.png"],
				["images/Hall10.png","images/Hall20.png","images/Hall30.png"],
				["images/Hall100.png","images/Hall200.png","images/Hall300.png"]];
var curbcg = 0;
var bcgid = 0;
var lrs;
var CanSwitch = false;
var nxtpic = true;


function Layer (id){
	this.id = id;
	this.x = 0;
	this.y = 0;
	this.w = 1000;
	this.h = 800;
	this.update = function(s){
		
		if(this.x + this.w < 0){
			this.id = this.id + 1;
			this.x -= s+10;
			Loadbcg(this.id);

		}

		else {
			this.x -= s+10;
			nxtpic = true

		} 

		if (this.id = 3){
			this.id = 0
		}
		//console.log(this.id)

	};

	this.render = function() {

		var img  = Store.cache[bcgdata[curbcg][this.id]];

		ctx.drawImage(img,0,0,this.w, this.h, this.x+this.w, this.y, this.w, this.h);
	
	};
};

// Functions

	function clear(){
		ctx.clearRect(0,0,width,height);
	};
	function game(){
		clear()
		//for(var i = 0; i < lrs.length; i++){
			//bcgid = 0
			console.log(bcgdata[curbcg].length + " lengthbcgdata")
			console.log(bcgid + " current image")
			console.log(nxtpic + " next pic")
			for(bcgid = bcgid; bcgid < bcgdata[0].length; bcgid++){	
				//if( nxtpic == true)
				lrs.update(bcgid);
				lrs.render();
				nxtpic = false
		};
			//bcgid = 0

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
		//lrs.push(new Layer(i));
		//console.log(i)

	}



$(document).ready(function(){
	Store.loaddata(data).then(function(){
    	canvas = document.getElementById('scene');
    	ctx = canvas.getContext('2d');
		width = window.innerWidth;
		height = window.innerHeight;
		//console.log(Store.cache);
		lrs = new Layer(0)

		//setInterval(Layer, 5000);
		setInterval(game, 100);
	});

});

//$(document).ready(Loadbcg(0));