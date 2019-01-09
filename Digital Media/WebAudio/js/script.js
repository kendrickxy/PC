// 	Global Variables
var canvas, ctx, width, height, ac, sound, gain;

//	Objects

function playsound(buffer) {

	var source = ac.createBufferSource();
	source.buffer = buffer;

	source.connect(gain);
	gain.connect(ac.destination);
	source.start(0)

}

//	Functions
	function clear() {
		ctx.clearRect(0,0,width,height);
	};

	function game() {
		//clear
		clear();
		//update

		//render
	
	}

//	Init
$(document).ready(function(){

	canvas = document.getElementById("scene");
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;

	ac = new AudioContext();
	gain = ac.createGain();

	var ajax = new XMLHttpRequest();
	ajax.open("get", "media/epub.mp3", true);
	ajax.responseType = "arraybuffer";
	ajax.onload = function(){
		ac.decodeAudioData(ajax.response, function(buffer){
			sound = buffer;
			console.log(sound);

		});
	}
	ajax.send();

	setInterval(game,60);

});