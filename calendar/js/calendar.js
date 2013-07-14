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
   
   	document.getElementById('activity').innerHTML = "Activity: <br>" + 
    getActivity(day-1,month) + "<br><br>"+displayTE(month,day-1);
});
//function to go to calendar tip page
function linkTopage(param)
{
	sessionStorage.date = param;
	document.location.href = "index.html";
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

//returns the tip associated with the given day and month; month = 0(jan), 1(feb); day = 1,2..,31
function getActivity(day,month){
	return tipsArray[month][day];
}

//function to display today's event below the main calendar
function displayTE(m,d){
var val;
$.ajax({
        type: "POST",
        url: "php/events.php",
        async:false,
        cache: false,
        success: function(data){
            var obj = jQuery.parseJSON(data);
            val = "Events: <br>" + obj[m][d]
        }
     });   
    return val;
}
