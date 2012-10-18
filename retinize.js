
var retPrefix = "2x_";

function retinize(str){
	 newStr = str
	 if (window.devicePixelRatio == 2){
            newStr += retPrefix;           	
		}
	
	 return newStr;
 }
 
 function retinize_pre(str){
	
	 newStr = str
	 if (window.devicePixelRatio == 2){
            newStr = retPrefix + newStr;           	
		}
	
	 return newStr;
 }
 
 function retinize_thumbnail(title){
	numStr = (window.devicePixelRatio == 2) ? "2":"1";
	return "./images/paintings/" + title + "_" + numStr + "x_thumbnail.jpg";
 }
 
 function retinize_expand(title){
	numStr = (window.devicePixelRatio == 2) ? "2":"1";
	return "./images/paintings/" + title + "_" + numStr + "x_full.jpg";
 }
