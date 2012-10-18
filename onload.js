var currXPos;
var leftPageMargin = 128;
var clickNavHappening = false;

function contentDomain(elementList) {
	this.elementList = elementList;
	if (elementList.length == 0 || elementList == null) throw "Can't initiate contentDomain class without a full list!";
	
	this.xPageMargin = leftPageMargin;
	this.yPageMargin = 0;
	this.xStart = 0;
	this.xEnd = 0;
	this.yStart = 0;
	this.yEnd = 0;	
	this.getXDomain = function(){
								for (i = 0; i < this.elementList.length; i++){
									currID = this.elementList[i].getAttribute("id");
									lPos = $("#" + currID).offset().left;
									rPos = $("#" + currID).offset().left + $("#" + currID).width();
									if (i==0) {this.xStart = lPos; this.xEnd = rPos;};
									if (lPos < this.xStart) this.xStart = lPos;						
									if (rPos > this.xEnd) this.xEnd = rPos;
								}
								this.xStart = this.xStart - this.xPageMargin;
								this.xEnd = this.xEnd - this.xPageMargin;
								this.yStart = this.yStart + this.yPageMargin;
								this.yEnd = this.yEnd + this.yPageMargin;
						};					
	this.init  = function (){
					this.getXDomain();
				 };			
	this.init();
	console.log("_DOMAIN_");
	console.log(this.elementList);
	console.log("xSTART AND xEND: " + this.xStart + " : " + this.xEnd);
	console.log("ySTART AND yEND: " + this.yStart + " : " + this.yEnd);
};

var thumbnailDomain = null;
var aboutDomain = null;    
var newsDomain = null;     
var contactDomain = null;
var thumbnails = null;
var menuObj = null;

function getDomainByTagName(tagName){
	if (tagName == "thumbnail") return thumbnailDomain;
	else if (tagName == "about") return aboutDomain;
	else if (tagName == "news") return newsDomain;
	else if (tagName == "contact") return contactDomain;
}
	
window.onload=function() {
	thumbnailDomain = new contentDomain($('canvas[id^="' + "thumbnail" + '"]'));
	aboutDomain =     new contentDomain($('[id^="' + "about" + '"]'));
	newsDomain =      new contentDomain($('[id^="' + "news" + '"]'));
	contactDomain =   new contentDomain($('[id^="' + "contact" + '"]'));
	
	var sURL = new String(window.parent.document.URL);
		
	
	

	/* Locks the y-axis from being scrolled.  By way of .css and then by way of MacScrolling. */
	$("body").css("overflow-y", "hidden"); 
	/* plug in for converting vertical scrolling to horizontal */	
	document.addEventListener('DOMMouseScroll', function(e) { 
		if (e.axis == e.VERTICAL_AXIS) {
			e.stopPropagation(); 
			e.preventDefault();
			e.cancelBubble = false; 
		}
    return false;
	}, false);	
	/* Sets the scrolling mechanism to translate mouse scrolls as down to horizontal.*/
	$("html, body, *").mousewheel(function(event, delta) {
		  this.scrollLeft -= (delta * 30);
		  //event.preventDefault();	  
   	});
	
   
	menuObj = new menuObject();	
	thumbnails = new thumbnailCollection();	
	
	menuObj.fadeInAnim([600, 600, 600, 600], [100, 300, 300, 300]);
	thumbnails.fadeInAnim([600], [600]);
	
	$(window).scroll(function () { 
      //console.log("currXPos: " + $(document).scrollLeft());
	  currXPos = $(document).scrollLeft();
	  if (!clickNavHappening) menuObj.fadeByScrollPos(currXPos, thumbnailDomain, aboutDomain, newsDomain, contactDomain);
	  
    });

}// JavaScript Document