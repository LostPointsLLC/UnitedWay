$(".cat_img").click(function() {
	var par = $(this).parent();
	sessionStorage.tCat = par.attr('id'); // whichever tip category was clicked
	document.location.href = "personal_tips.html";
});