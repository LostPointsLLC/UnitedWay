$(document).ready(function() {

	var $collapsibleContent = $("#places").next().find(".ui-collapsible-content");

	for(var i = 0; i < $collapsibleContent.length; i++) {
		$collapsibleContent.css("box-shadow", "none");
	}
});