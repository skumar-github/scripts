// JavaScript Document




var descriptionObjects = {
	documentElements:    {
							descarea: 	{id: "descarea", 	tag: "div"},
						 },
	loaded: false
}

function getDescription(desc_area, title) {
	// from paintings.jsonp
	var descTxt = paintingDescriptions[title]; 
	//var fullStr = "<div id=\"middle\"> <div id=\"inner\">";
	
	var fullStr = "";
	for (key in descTxt){
		val = descTxt[key];
		addStr = (key=="title") ? ("<i>" + val + "</i>"):val;	   
   		fullStr += addStr + "<br />";
    }
   
   fullStr += "";
	return fullStr;
}

function hideDescriptionObjects(){	
	$(document).ready(function() { 
		$("#" + currPaintingID + "_" + "descarea").stop(true, true); // clears the queue 
		$("#" + currPaintingID + "_" + "descarea").fadeOut("slow", function(){
		   	var obj = descriptionObjects.documentElements["descarea"];
		   	obj.elt.style.opacity = 1;
			console.log("fading area out")});
	});
	
}

function showDescriptionObjects(){
	$(document).ready(function() {
		$("#" + currPaintingID + "_" + "descarea").stop(true, true);  // clears the queue 
		//$("#" + currPaintingID + "_" + "descarea").fadeOut(0, function(){console.log("fading area in")});
		$("#" + currPaintingID + "_" + "descarea").fadeIn("slow", function(){console.log("fading desc in")});
	});
	
}


function initDescriptionObjects(){
	
   for (key in descriptionObjects.documentElements){
	   var obj = descriptionObjects.documentElements[key];
	   obj.elt = document.createElement(obj.tag);
	   obj.elt.setAttribute("id", currPaintingID + "_" + obj.id);
   	   obj.elt.setAttribute("class", obj.id + "style");
   }
	
   var desc_area = descriptionObjects.documentElements.descarea;
   var descScheme = "static";
   
   //desc_area.elt.style.po
   desc_area.elt.style.left = (window.innerWidth/2 + g_halfW).toString() + "px";
   desc_area.elt.style.top = (window.innerHeight/2 + g_halfH).toString() + "px";
   
   if (descScheme == "hover"){
	   
	   var descWidth = desc_area.elt.offsetWidth;
	   var lgutter = 320;
	   var tgutter = -240;
	   var desc_text = descriptionObjects.documentElementsdesc;
	   descMar = g_halfW + descWidth;
	   desc_area.elt.style.height = "100px";
	   desc_area.elt.style.width = (_img.elt.width - 30).toString() + "px";
	   
	   
	   
	   desc_area.elt.style.marginTop = (g_halfH - parseInt(desc_area.elt.style.height, 10)).toString()+"px";
	   desc_area.elt.style.marginTop = (g_halfH).toString()+"px";
	   desc_area.elt.style.marginLeft = "-" +descMar.toString()+"px";
   }

   desc_area.elt.innerHTML = getDescription(desc_area, currPaintingID);
   desc_area.elt.style.fontFamily = "Adobe Caslon Pro";
   desc_area.elt.style.fontSize = "15px";

   for (key in descriptionObjects.documentElements){
	   var obj = descriptionObjects.documentElements[key];
	   obj.elt.style.opacity = 0;
	   document.body.appendChild(obj.elt);
	   console.log("Description Adding " + key + " elt: " + obj.elt.id);
   }

	hideDescriptionObjects();
   
}