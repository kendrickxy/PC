var Engine = new function(){	
	
	this.init = function(canvas_id, callbacks){
		
		this.canvas = document.getElementById(canvas_id);
		
	
		this.ctx = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		
		
		this.callbacks = callbacks;
		
		
		
		this.callbacks["start"]();
	}
	this.loadstate = function(state){
		this.state = state;	
	}
	this.loop = function(){
		this.state.update();
		this.state.render();
		requestAnimationFrame( function(){
			Engine.loop();
		} );	
	}
	
}
