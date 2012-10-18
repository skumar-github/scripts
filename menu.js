var minMenuOpacity = 0.2;

function getScrollFade(eltDomain){
	eltOpacity = 1;
	fadeDist = 200;
	if ((eltDomain.xStart <= currXPos) && (currXPos <= eltDomain.xEnd)) {
		logoOpacity = 1;
	}
	else
	{
		if (currXPos < eltDomain.xStart) {
			subNum = (eltDomain.xStart - currXPos)/fadeDist;
			if (subNum > 1) subNum = 1;
			eltOpacity = 1 - subNum + minMenuOpacity;
		}
		else if (currXPos > eltDomain.xEnd) {
			subNum = (currXPos - eltDomain.xEnd)/fadeDist;
			if (subNum > 1) subNum = 1;
			eltOpacity = 1 - subNum + minMenuOpacity;
		}
	};
	return eltOpacity
}

function navigateAnim(tag, inTime, outTime, scrollTime){
	clickNavHappening = true;
	
	$('[id^="' + 'menu' + '"]').fadeTo(outTime, minMenuOpacity);
	$('canvas[id^="' + "thumbnail" + '"]').fadeOut(outTime).delay(scrollTime).fadeIn(inTime, function(){clickNavHappening = false});	
	$('[id^="' + 'about' + '"]').fadeOut(outTime).delay(scrollTime).fadeIn(inTime, function(){});
	$('[id^="' + 'news' + '"]').fadeOut(outTime).delay(scrollTime).fadeIn(inTime, function(){});			
	$('[id^="' + 'contact' + '"]').fadeOut(outTime).delay(scrollTime).fadeIn(inTime, function(){});
	//
	
	setTimeout(function(){
						//$("html, body").animate({ scrollLeft: getDomainByTagName(tag).xStart - leftPageMargin,
						$("html, body").animate({ scrollLeft: getDomainByTagName(tag).xStart}, scrollTime);
					}, outTime);
	
	getVal = "";
	if (tag =='thumbnail') getVal = "logo";
	else getVal = tag;
	
	console.log('fading in: ' + '#menu_' + getVal);
	
	$('#menu_' + getVal).delay(scrollTime).fadeTo(inTime, 1);
	
}

function menuObject() {
	this.type = "menu";
	this.tagType = "canvas";
	this.IDs = ["menu_logo", "menu_about", "menu_news", "menu_contact"];
	this.elements = [],
	this.imgElements = [new Image(), new Image(), new Image(), new Image()];
	this.fadeInAnim = function(fadeLengths, fadeIntervals){
							setTimeout(function(){fadeIn("menu_logo",     fadeLengths[0], 1.0)}, fadeIntervals[0]);
							setTimeout(function(){fadeIn("menu_about",    fadeLengths[1],  minMenuOpacity)}, fadeIntervals[1]);
							setTimeout(function(){fadeIn("menu_news",     fadeLengths[2],  minMenuOpacity)}, fadeIntervals[2]);
							setTimeout(function(){fadeIn("menu_contact",  fadeLengths[3],  minMenuOpacity)}, fadeIntervals[3]);
			
					   };
	
	this.mouseOver = function(){};	
	this.mouseOut = function(){};
	this.getImgSrc = function(ID){
		getImgSrcStr = "images/" + ID + ".png";	
		console.log("menu getImgSrc: " + getImgSrcStr);
		return getImgSrcStr;
	};
	
	this.fadeByScrollPos = function(currXPos, thumbnailDomain, aboutDomain, newsDomain, contactDomain){		
		var logoOpacity = 		getScrollFade(thumbnailDomain);
		var aboutOpacity = 		getScrollFade(aboutDomain);
		var newsOpacity = 		getScrollFade(newsDomain);
		var contactOpacity = 	getScrollFade(contactDomain);
		
		//console.log(logoOpacity);
		/*
		$('#menu_logo').get(0).style.opacity = logoOpacity;
		$('#menu_about').get(0).style.opacity = aboutOpacity;
		$('#menu_news').get(0).style.opacity = newsOpacity;
		$('#menu_contact').get(0).style.opacity = contactOpacity; */
		
		$('#menu_logo').fadeTo(0, logoOpacity);
		$('#menu_about').fadeTo(0, aboutOpacity);
		$('#menu_news').fadeTo(0, newsOpacity);
		$('#menu_contact').fadeTo(0, contactOpacity); 
	
	};
	
	this.init = function() {
        initFadeables(false, this, initCanvasImage);
		outTime = 300
		inTime = 300;
		scrollTime = 500;
		document.getElementById("menu_about").onclick = 	function(){
																navigateAnim('about', inTime, outTime, scrollTime);
															};
		document.getElementById("menu_logo").onclick =  	function(){
																navigateAnim('thumbnail', inTime, outTime, scrollTime);
															};
		document.getElementById("menu_news").onclick =  	function(){
																navigateAnim('news', inTime, outTime, scrollTime);
															};	
		document.getElementById("menu_contact").onclick = 	function(){
																navigateAnim('contact', inTime, outTime, scrollTime);
															};		       
    };
	this.init();

}
 