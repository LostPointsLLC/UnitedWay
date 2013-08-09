//checks if user selected persistent login
function checkPersist(){
	if(localStorage.remember==1){
		document.location.href = "home/";
	}
}