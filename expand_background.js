// JavaScript Document
var backgroundObjects = {
	documentElements:    {
							bg:	{id: "overlaybg", 	tag: "div"},
						 },
	loaded: false
}

function initBackgroundObjects(){
	for (key in backgroundObjects.documentElements){	
	   var obj = backgroundObjects.documentElements[key];
	   obj.elt = document.createElement(obj.tag);
	   obj.elt.setAttribute("id", obj.id);
	   obj.elt.setAttribute("class", obj.id + "style");
	   obj.elt.onclick=restore; 
	   document.body.appendChild(obj.elt);
	} 	
}

function showBackgroundObjects(){
	for (key in backgroundObjects.documentElements){	
	   //var obj = backgroundObjects.documentElements[key];
	   $("#" + backgroundObjects.documentElements[key].elt.id).fadeOut(0, function(){});
	   $("#" + backgroundObjects.documentElements[key].elt.id).fadeIn("slow", function(){});
	} 
	
}