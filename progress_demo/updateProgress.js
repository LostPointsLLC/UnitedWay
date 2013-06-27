//function to update progress. function is called from the start in HTML
function updateProgress() {
	//need to parse the JSON object gotten from the phpscript. having some trouble with it.
	/**$.post("./phpscript.php",function(data){
    alert(data);
  	});**/

    alert("1");
    var bar = document.getElementById("childProg");
    // updates the value of the progress bar
    bar.value +=1;
	

}