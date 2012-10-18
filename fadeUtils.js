

function initFadeables(visible, eltObjects, handlerFunc){//eltIDs, eltImages){
	
	eltIDs = eltObjects["IDs"];
	
	console.log("initMenu()");
	$(document).ready(function() {
		for (var i = 0; i < eltIDs.length; i++) {
			elt = document.getElementById(eltIDs[i]);
			console.log("init menuElt: " + elt.id);
			elt.style.opacity = 0;
			elt.style.width = elt.width.toString() + "px";
			elt.style.height = elt.height.toString() + "px";
			eltObjects.elements.push(elt);
			handlerFunc(elt, eltObjects);
			
			if (!visible) $("#" + eltIDs[i]).fadeOut(0, function(){});
			elt.style.opacity = 1;
		}
	});
}



function fadeIn(fadeable, duration, opacity){	
	$("#" + fadeable).fadeOut(0, function(){});		
	$("#" + fadeable).fadeTo(duration, opacity, function(){});
}

function fadeOut(fadeable, duration){
	$("#" + fadeable).css({ opacity: 1 });	
	$("#" + fadeable).fadeOut(duration, function(){});
}