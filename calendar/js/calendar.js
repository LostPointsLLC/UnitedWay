//loads the calendar for the current month
$('#calendar').datepicker({
        inline: true,
        firstDay: 1,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        onSelect: function(datestr, inst){
        	linkTopage(datestr);
        }
    });
$(document).ready(function() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth();
   // updateDate(day,month);
   // updateEvent(day,month);
   displayTE(month,day-1);
});
//function to go to calendar tip page
function linkTopage(param)
{
	sessionStorage.date = param;
	document.location.href = "calendartip.html";
//alert(sessionStorage.date);
}

//function to go back to home page
function goHome()
{
    document.location.href = "../home/";
}

//function to go to help page
function goHelp()
{
    document.location.href = "../help/Calendar.html";
}

//function to display today's event below the main calendar
function displayTE(m,d){
$.ajax({
        type: "POST",
        url: "php/events.php",
        
        cache: false,
        success: function(data){
            var obj = jQuery.parseJSON(data);
            document.getElementById('events').innerHTML = "<br>" + "Events: <br>" + obj[m][d];
        }
     });    
}