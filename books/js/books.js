$(document).ready(function() {
	initializeBooks();
});


function initializeBooks() {

	$('#content').load('0-2years-content.html');

}

function changeBooks(pageNum) {
	var num = parseInt(pageNum);

	switch(num) {
		case 1:
			$('#content').load('0-2years-content.html');
			break;
		case 0:
			$('#content').load('3-5years-content.html');
			break;
	}
}
