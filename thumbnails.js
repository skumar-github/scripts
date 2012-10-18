// JavaScript Document

var thumbnailTimerInterval = 20;
var thumbnailAnimTime = 5000;
var timerID;
var dtimerID;

var outTimerID = new Array();
var inTimerID = new Array();
var thumbnailsQueryStr = "canvas" +  '[id^="' + "thumbnail" + "_" + '"]';

var thumbnailPrefix = "thumbnail_"

function initCanvasImage(elt, _thumbnailCollection){
		if (elt.tagName.toLowerCase() == "canvas"){
			console.log("initCanvasImage() 1: " + elt.id + " " + elt.style.width + " " + elt.style.height + " " + elt.tagName);
			var context=elt.getContext("2d");			
			if (window.devicePixelRatio == 2){
				elt.width = eltIDs.width*2;
				elt.height = eltIDs.height*2;
				elt.style.width = (eltIDs.width/2).toString() + "px";
				elt.style.height = (eltIDs.height/2).toString() + "px";
			}
			eltImage = new Image();
			eltImage.id = elt.id + "_img";
			eltImage.parentID = elt.id;
			eltImage.src = _thumbnailCollection.getImgSrc(elt.id);
			//$(document).ready(function() {
			eltImage.onload = function(){
								document.getElementById(this.parentID).getContext("2d").drawImage(this,0,0, elt.width, elt.height);
							  }
				//context.strokeRect(0,  0, elt.width, elt.height);
			//});
			_thumbnailCollection.imgElements.push(eltImage);
			console.log("init menuElt src: " + eltImage.src);
		}
}

function thumbnailCollection() {
	this.type = thumbnailPrefix.substr(0, thumbnailPrefix.length -1);
	this.tagType = "canvas";
	
	
	this.IDs = [];
	this.elements = [],
	this.paintingIDs = [],
	this.imgElements = [],
	this.fadeInAnim = function(fadeLengths, fadeIntervals){
							setTimeout(function(){
										thumbnailElts = $(thumbnailsQueryStr);
										//console.log(thumbnailElts);
										for (var i = 0; i < thumbnailElts.length; i++) {
											console.log("Thumnail elts: " + thumbnailElts[i].id);
											fadeIn(thumbnailElts[i].id,     fadeLengths[0], 1.0);
											//fadeIn(this.IDs[i],     fadeLengths[0], 1.0);
										}
									    }, fadeIntervals[0]);			
					  };
				
	
	this.getImgSrc = function(ID){
		getImgSrcStr = "images/paintings/" + this.paintingIDs[this.IDs.indexOf(ID)] + ".jpg";	
		console.log("thumb getImgSrc: " + getImgSrcStr);
		return getImgSrcStr;
	}
	this.mouseOver = ( function(n){ return function(){thumbnailMouseOver(this, n);} } )(this );	
	this.mouseOut =  ( function(n){ return function(){thumbnailMouseOut(this, n);} } )(this );	
	this.testFunc = function(){alert("TEST FUNC!");};
	
	this.init = function(){			
						thumbnailElts = $(thumbnailsQueryStr);
						for (var i = 0; i < thumbnailElts.length; i++) {
							this.IDs.push(thumbnailElts[i].id);
							thumbnailElts[i].onmouseover = this.mouseOver;
							thumbnailElts[i].onmouseout = this.mouseOut;
							thumbnailElts[i].onclick = expand;
							this.paintingIDs.push(thumbnailElts[i].id.substr(this.type.length+1, thumbnailElts[i].id.length));
						}
						
						initFadeables(false, this, initCanvasImage);
						console.log("After Init Fadeables:");
						console.log(this.imgElements);
						for (var i = 0; i < this.imgElements.length; i++) {
		       				console.log(this.imgElements[i].src);
						}
    };
	this.init()
	
}



function thumbnailMouseOut(element, thumbnailCollection){
	
	ga = 0;
	console.log("MOUSE OUT!");
	console.log(element.getAttribute("id"));
	var context=element.getContext("2d");
	var currThumbImage = "";
	var gIndex = thumbnailCollection.IDs.indexOf(element.getAttribute("id"));
	currThumbImage = thumbnailCollection.imgElements[gIndex];
	
	clearInterval(inTimerID[gIndex]);
	clearInterval(outTimerID[gIndex]);
	
	context.globalAlpha = 50/(thumbnailAnimTime/thumbnailTimerInterval);

	outTimerID[gIndex] = setInterval(function(){
			context.drawImage(currThumbImage, 0,0, element.width, element.height);
			//context.fillRect(0,0,currThumb.width,currThumb.height);			
			ga = ga + thumbnailAnimTime/thumbnailTimerInterval;
			if (ga > thumbnailAnimTime){
				ga = 0;
				context.globalAlpha = 1;
				clearInterval(outTimerID[gIndex]);
				
				
			}	
		},thumbnailTimerInterval);
		

}


function thumbnailMouseOver(element, thumbnailCollection){
	ga = 0;
	
	console.log("MOUSE OVER!");
	console.log(element.getAttribute("id"));

	var context=element.getContext("2d");
	var currThumbImage = "";
	var gIndex = thumbnailCollection.IDs.indexOf(element.getAttribute("id"));
	currThumbImage = thumbnailCollection.imgElements[gIndex];
	
	clearInterval(inTimerID[gIndex]);
	clearInterval(outTimerID[gIndex]);
	
	
	context.globalAlpha = 1;	
	//var my_gradient=context.createLinearGradient(0,0, (currThumb.width/1.7) , (currThumb.height/1.7));
	var my_gradient=context.createLinearGradient(0,0, 0, (element.height/1.7));
	my_gradient.addColorStop(0,'rgba(255,255,255,.09)');
	my_gradient.addColorStop(1,'rgba(255,255,255,.001)');
	context.fillStyle=my_gradient;
	//context.fillStyle=my_gradient;

	context.strokeStyle = 'rgba(132,68,154,.07)';
	context.lineWidth   = 6;
	//context.strokeStyle = 'rgba(132,68,154,1)';
	//context.strokeRect(0,  0, currThumb.width, currThumb.height);
	
	inTimerID[gIndex] = setInterval(function(){
						context.strokeRect(0,  0, element.width, element.height);
						//context.fillRect(0,0,currThumb.width,currThumb.height);
						ga = ga + thumbnailAnimTime/thumbnailTimerInterval;
						//console.log("on  ga: " + ga + " global alpha: " + context.globalAlpha);
						if (ga > thumbnailAnimTime){
							ga = 0;
							clearInterval(inTimerID[gIndex]);
						}	
					},thumbnailTimerInterval);
}
