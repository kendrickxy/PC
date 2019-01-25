//Global Variables
var canvas, ctx, width, height, img;


// 1. Create the button
var button = document.createElement("button");
button.innerHTML = "Do Something";

// 2. Append somewhere
var body = document.createTextNode("body");
button.appendChild(body);

// 3. Add event handler
button.addEventListener ("click", function() {

  alert("did something");
});


/* 1. Create the OptionButtion
var OptionB = document.createElement("OptionB");
OptionB.innerHTML = "Do Something";

// 2. Append somewhere
var ButtonCSS = document.getElementsByTagName("ButtonCSS");
//ButtonCSS.appendChild(OptionB);

// 3. Add event handler
OptionB.addEventListener ("click", function() {
  alert("did Option");
});


// 1. Create the Quit
var QuitB = document.createElement("QuitB");
QuitB.innerHTML = "Do Something";

// 2. Append somewhere
var ButtonCSS = document.getElementsByTagName("ButtonCSS");
//ButtonCSS.appendChild(QuitB);

// 3. Add event handler
QuitB.addEventListener ("click", function() {
  alert("did Quit");
});*/



$(document).ready(function(){

    canvas = document.getElementById("startmenu");
    width = canvas.width;
    height = canvas.height;

});