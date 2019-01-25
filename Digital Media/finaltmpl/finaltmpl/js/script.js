var data = [
	{"url":"images/bck1.png"},
	{"url":"images/bs2.png", "attr": {"id":"myimage", "class":"myclass"}},
	{"url":"sound/epub.mp3"}
]
var callbacks = {
		"start" : function(){ console.log("works")
			Engine.loadstate(new Screen() );
			Engine.loop();
		},
		"die" : function(){
			
			
			
		}

}


$(document).ready(function(){


		
	Store.loaddata(data).then(function(){
	
		
		Engine.init("scene",callbacks);		
		
		
		
	});	

});