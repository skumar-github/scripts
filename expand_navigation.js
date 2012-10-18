
var navigationObjects = {
	documentElements:  {
							arrowleft:			{id: "arrowleft",   dir: "left", tag: "canvas"},
							arrowright:			{id: "arrowright",  dir: "right", tag: "canvas"}	
						},
	loaded: false
}


function drawArrow(element, dir){
	
	var context=element.getContext("2d");	
	context.strokeStyle = 'rgba(255,255,255,1)';
	context.lineWidth   = 6;
    
	var arrowW = 16;
	var arrowH = 74;
	
	if (dir=="right"){
		context.moveTo(0,0);
		context.lineTo(arrowW,arrowH/2);
		context.lineTo(0,arrowH);
		context.stroke();
	}
	
	if (dir=="left"){
		context.moveTo(arrowW,0);
		context.lineTo(0,arrowH/2);
		context.lineTo(arrowW,arrowH);
		context.stroke();
	}

	/**
	timerInt = 20;
	totalTime = 1000;
	timerID = setInterval(function(){
			context.strokeRect(0,  0, currThumb.width, currThumb.height);
			//context.fillRect(0,0,currThumb.width,currThumb.height);
			ga = ga + totalTime/timerInt;
			if (ga > totalTime){
				ga = 0;
				clearInterval(timerID);
				
			}	
		},timerInt);
	*/
	
}
function initNavigationObjects(){
	console.log("INIT NAVIGATION OBJECTS");
	
	for (key in navigationObjects.documentElements){
	   var obj = navigationObjects.documentElements[key];
	   console.log(obj);
	   console.log("NAV OBJ " + obj.tag);
	   obj.elt = document.createElement(obj.tag);
	   obj.elt.setAttribute("id", currPaintingID + "_" + obj.id);
   	   obj.elt.setAttribute("class", obj.id + "style");
	   document.body.appendChild( obj.elt);
	   
   }
	
   RightImageIndex = getRightImageIndex(currPaintingID);
   LeftImageIndex = getLeftImageIndex(currPaintingID);
   
   console.log("Right IMAGE INDEX: ");
   console.log(RightImageIndex);
   if (RightImageIndex != null) {
	   _arrowright = navigationObjects.documentElements.arrowright;
	   //_arrowright.elt.style.opacity = 0;
	   _arrowright.elt.onclick = loadRightImage;
	   //_arrowright.elt.src = "./images/arrows/arrow_right_white_2x.png";
	   _arrowright.elt.style.marginTop = "-32px";
	   
	   console.log("HALF_W: " + g_halfW)
	   _arrowright.elt.style.marginLeft = (g_halfW + 20).toString()+"px";
	   drawArrow(_arrowright.elt, _arrowright.dir);
   }
   
   
   console.log("LEFT IMAGE INDEX: ");
   console.log(LeftImageIndex);
   if (LeftImageIndex != null) {
	   _arrowleft = navigationObjects.documentElements.arrowleft;
	   _arrowleft.elt.onclick = loadLeftImage;
	   //_arrowleft.elt.style.opacity = 0;
	   //_arrowleft.elt.src = "./images/arrows/arrow_left_white_2x.png";
	   _arrowleft.elt.style.marginTop = "-32px";
	   _arrowleft.elt.style.marginLeft = "-" + (g_halfW + 43).toString()+"px";
	   drawArrow(_arrowleft.elt, _arrowleft.dir);
   }	
   
   
   hideNavigationObjects();
   //return;
}

function hideNavigationObjects(){
	console.log("HIDING NAVIGATION OBJECTS");
	for (key in navigationObjects.documentElements){	
	   $("#" + navigationObjects.documentElements[key].elt.id).stop(true, true); 
	   
	   $("#" + navigationObjects.documentElements[key].elt.id).fadeOut(0, function(){
		   	//navigationObjects.documentElements[key].elt.style.opacity = 1;
		   });
	   //$("#" + navigationObjects.documentElements[key].elt.id).fadeIn("slow", function(){navigationObjectsLoaded = true});
	}
}

function showNavigationObjects(){
	console.log("SHOWING NAVIGATION OBJECTS");
	for (key in navigationObjects.documentElements){
  //navigationObjects.documentElements[key].elt.style.opacity = 1
	   $("#" + navigationObjects.documentElements[key].elt.id).stop(true, true);
	   	
	   $("#" + navigationObjects.documentElements[key].elt.id).fadeOut(0, function(){});
	   $("#" + navigationObjects.documentElements[key].elt.id).fadeIn("slow", function(){
		   console.log("navobj fade!");
		   navigationObjects.loaded = true});
	} 
	
}