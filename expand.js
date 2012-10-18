var g_halfH;
var g_halfW;
var _img;
var paintings = new Array();
var paintingIDs = new Array();
var thumbnails = new Array();
var currPaintingID = "";
var prevPaintingID = "";
var RightImageIndex = null;
var LeftImageIndex = null;
var loadCount = 0;
var foregroundObjectIDs = {};

//for thumbnail fading
var timerID = 0;
var ga = 0;

function setObjectLoadedStatus(objects){
	for (var i = 0; i < objects.length; i++){
		objects[i].loaded = false;	
	}
}

function expand() { 


   setObjectLoadedStatus([imageObjects, navigationObjects, backgroundObjects, descriptionObjects]);
   removeComplete = false;
   
   if (currPaintingID != ""){
		prevPaintingID = currPaintingID;   
	    console.log("Prev img: " + prevPaintingID);
   }
   else{ 
	  initBackgroundObjects();
	  showBackgroundObjects();
   }
   
  													    /*Global*/
   currPaintingID = this.getAttribute("id").substring(thumbnailPrefix.length, this.getAttribute("id").length);
	
   initImageObjects(this);
   initDescriptionObjects(this);
   initNavigationObjects(this);
   
   console.log("IMAGE OBJECTS");
   console.log(imageObjects);
   
   $.extend(foregroundObjectIDs, imageObjects.documentElements, navigationObjects.documentElements, descriptionObjects.documentElements);
   console.log("FG OBJECTS");
   console.log(foregroundObjectIDs);
   
   showImageObjects(function(){ 
   				if (!imageObjects.loaded){ 
					imageObjects.loaded = true;
					showDescriptionObjects();
					showNavigationObjects();
				}
				
   } );
  
   
	
}

function getRightImageIndex(currID){
	for (var i = 0; i < thumbnails.paintingIDs.length; i++) {
		console.log("Parse images: " + currID);
		if (thumbnails.paintingIDs[i] == currID){
			console.log('Changing nextImgInd');
			if ((i+1) < thumbnails.paintingIDs.length) return i+1;
			return null;
		}
	}
	return null;
}

function getLeftImageIndex(currID){
	for (var i = (thumbnails.paintingIDs.length -1); i >= 0; i--) {
		console.log("Parse images: " + currID);
		if (thumbnails.paintingIDs[i] == currID){
			console.log('Changing nextImgInd');
			if ((i-1) >= 0) return i-1;
			return null;
		}
	}
	return null;
}

function loadRightImage(){
	//if (RightImageIndex < paintingIDs.length) 
	document.getElementById(thumbnails.IDs[RightImageIndex]).click();
}

function loadLeftImage(){
	//if (LeftImageIndex > 0) 
	document.getElementById(thumbnails.IDs[LeftImageIndex]).click();
}

function removePreviousForeground() { 
	console.log("Removing all objects associated with: " + prevPaintingID);
	if (prevPaintingID != "") {
		$(document).ready(function() { 

				
	   		fadeOutIterator(foregroundObjectIDs, prevPaintingID, function(key){
				document.body.removeChild(document.getElementById(prevPaintingID + "_" + foregroundObjectIDs[key].id));
				});
					
		});
	}
	
   
}

function getObjLength(obj){
	count = 0;	
	for (key in obj){
		count ++;
	}
	return count;
}

function restore() { 		
	// Removing the foreground
	fadeOutIterator(foregroundObjectIDs, currPaintingID, function(key){
		console.log("       FGEndFunction");
		document.body.removeChild(document.getElementById(foregroundObjectIDs[key].elt.id));
		});
		
	// Removing the background is a separate process because of its IDing convention.
	//console.log("REMOVING BACKGROUND");
	fadeOutIterator(backgroundObjects.documentElements, "", function(){
			console.log("       BgEndFunction");
			console.log("       Bg: " + backgroundObjects.documentElements[key2].elt.id);
			document.body.removeChild(document.getElementById(backgroundObjects.documentElements[key2].elt.id));
		});
	
	
	//console.log("****************************changing curr Images " + prevPaintingID + " " + currPaintingID);
	prevPaintingID = "";
   	currPaintingID = "";
 
}

function fadeOutIterator(obj, idPreface, onEndFunction)
{
	$(document).ready(function() {
		if (idPreface != "") idPreface += "_";
		
		var keyCount = 0;
		for (key in obj){
					var objVal = obj[key];
					//console.log("Fade Out Iterator: " + objVal.elt.id);
					$("#" + idPreface + objVal.id).fadeOut("slow", function(){
						keyCount++;
						if (keyCount == getObjLength(obj))	 {						
							for (key2 in obj){
								onEndFunction(key2);
							}
						}
					});
		}
	});
	
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}




