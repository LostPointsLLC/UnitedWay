$(document).ready(function() {
	var child = document.getElementById("child");
	child.innerHTML = '<img src="../images/' + sessionStorage.gender + '.png" width="60" height="60" alt="" /><p>' + sessionStorage.name + '</p>';
});

function healthTips() {
	sessionStorage.tCat = "health";
	document.location.href = "personal_tips.html";
}

function growthTips() {
	sessionStorage.tCat = "growth";
	document.location.href = "personal_tips.html";
}

function safetyTips() {
	sessionStorage.tCat = "safety";
	document.location.href = "personal_tips.html";
}

function playTips() {
	sessionStorage.tCat = "playtime";
	document.location.href = "personal_tips.html";
}