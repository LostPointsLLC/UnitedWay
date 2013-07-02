$(document).ready(function() {
    updateDate(sessionStorage.date);
});
//hard coded array of tips. Any better way to do this?
var tipsArray = [
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//Jan tips index 0
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//Feb tips index 1
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//Mar tips index 2
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//Apr tips index 3
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//May tips index 4
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//Jun tips index 5
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//Jul tips index 6
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//Aug tips index 7
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//Sep tips index 8
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//Oct tips index 9
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//Nov tips index 10
	["aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc",
	 "aaa", "bbb", "ccc","aaa", "bbb", "ccc"],//Dec tips index 11

];
function updateDate(param){
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ]
	var monthIndex= parseInt(param)	//gets the numerical value of month
	var monthText = monthNames[monthIndex-1];//retrieves the string value of that month.
	var day = parseInt(param.substr(3));
	//Updates the chosen day, month and activity on the current page
	document.getElementById('day').innerHTML = day;
	document.getElementById('month').innerHTML = monthText;
	//has to offset by 1 because array index starts at 0.
	document.getElementById('activity').innerHTML = "Event: " + getActivity(day-1,monthIndex-1);

}

//go back to home page
function goHome(){
	window.location.href = "../home/";
}

//go back to calendar page
function goBack(){
window.location.href = "../calendar/";
}

//returns the tip associated with the given day and month; month = 0(jan), 1(feb); day = 1,2..,31
function getActivity(day,month){
return tipsArray[month][day];
}