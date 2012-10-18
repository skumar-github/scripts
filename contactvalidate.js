function validateForm(){
	
	this.validateText = validateText;
	this.validateEmail = validateEmail;
	
	nameOK = validateText("contactform", "Name");
	emailOK = validateEmail("contactform", "Email");
	msgOK = validateText("contactform", "Message");
	document.getElementById('redSubmitted').innerHTML = '';
	
		if (nameOK==true){
			document.getElementById('redName').innerHTML = '';
		}
		if (emailOK==true){
			document.getElementById('redEmail').innerHTML = '';
		}
		if (msgOK==true){
			document.getElementById('redMsg').innerHTML = '';
		}
		
	
	if (nameOK && emailOK && msgOK){
		//document.getElementById('redSubmitted').innerHTML = 'Submitted.  Thanks!';
		return true;
	}
	else{
		
		if (nameOK==false){
			document.getElementById('redName').innerHTML = '*Please enter a valid name.';
		}
		if (emailOK==false){
			document.getElementById('redEmail').innerHTML = '*Please enter a valid email.';
		}
		if (msgOK==false){
			document.getElementById('redMsg').innerHTML = '*Please enter a message.';
		}
		

	}
	return false;
}

function validateText(form, input)
{
	var x=document.forms[form][input].value;
	if (x==null || x==""){
	  return false;
	  }
	  return true;
}

function validateEmail(form, input)
{
	var x=document.forms[form][input].value;
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
	  return false;
	  }
	return true;
}