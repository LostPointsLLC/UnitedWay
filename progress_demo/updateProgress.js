//function to update progress. function is called from the start in HTML

function updateProgress() {
	//need to parse the JSON object gotten from the phpscript. having some trouble with it.
$.getJSON("http://localhost/progress_demo/phpscript.php",function(data){
  alert(data);
  var bar = document.getElementById("childProg");
  bar.value = data;
});
}
