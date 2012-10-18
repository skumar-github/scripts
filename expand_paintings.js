// JavaScript Document

var imageObjects = {
	documentElements:    {
							clearLayer: 		{id: "overlayclear", tag: "img"},
							image: 				{id: "overlayimg", 	tag: "img"},
						},
	loaded: false
}


function initImageObjects(selectedElement){
	
	 for (key in imageObjects.documentElements){
	   var obj = imageObjects.documentElements[key];
	   obj.elt = document.createElement(obj.tag);
	   obj.elt.setAttribute("id", currPaintingID + "_" + obj.id);
   	   obj.elt.setAttribute("class", obj.id + "style");
	   obj.elt.onclick=restore; 
	   console.log("key: " + key + " ID: " + obj.elt.id);
   }

   _img = imageObjects.documentElements.image;
   _clearLayer = imageObjects.documentElements.clearLayer;
	
   
   console.log("*************IMAGE ELEMENTS");
   console.log(thumbnails.imgElements);
   _img.elt.src = thumbnails.imgElements[thumbnails.IDs.indexOf(thumbnailPrefix + currPaintingID)].src;
   
   imgTagID = currPaintingID;
   

   _img.elt.width = parseInt(selectedElement.getAttribute("largeW"));
   _img.elt.height = parseInt(selectedElement.getAttribute("largeH"));
 
   _clearLayer.elt.width = parseInt(selectedElement.getAttribute("largeW"));
   _clearLayer.elt.height = parseInt(selectedElement.getAttribute("largeH"));

   
   g_halfH = _img.elt.height/2;
   g_halfW = (_img.elt.width)/2;
	
   _img.elt.style.marginTop = "-" +g_halfH.toString()+"px";
   _img.elt.style.marginLeft = "-" +g_halfW.toString()+"px";
   
   _clearLayer.elt.style.marginTop = "-" +g_halfH.toString()+"px";
   _clearLayer.elt.style.marginLeft = "-" +g_halfW.toString()+"px";
   //_clearLayer.elt.onmouseover = showDesc;
   //_clearLayer.elt.onmouseout = hideDescription; 
   //_clearLayer.elt.onclick = loadRightImage;
   
}

function showImageObjects(endFade){
	$(document).ready(function() { 
   		for (key in imageObjects.documentElements){
			console.log("showing image object: " + imageObjects.documentElements[key].elt.id);
			document.body.appendChild(imageObjects.documentElements[key].elt);
			$("#" + imageObjects.documentElements[key].elt.id).fadeOut(0, function(){});
			$("#" + imageObjects.documentElements[key].elt.id).fadeIn("slow", function(){
				endFade();
			});				
		}
		removePreviousForeground();
	});	
}
