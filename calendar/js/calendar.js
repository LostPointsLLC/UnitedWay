var counter = 0;    //counter to count how many times that particular date is clicked
var prevdate = null;    //variable to store previous date selected
//loads the calendar for the current month
$('#calendar').datepicker({
        inline: true,
        firstDay: 1,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        onSelect: function(datestr){
            var m = parseInt(datestr.substring(0,2))-1; //selected box month's int value from 0 to 11
            var d = parseInt(datestr.substring(3,5))-1; //selected box day's int value from 0 to 30
            //checks if it is the first time the date is selected
            //checks if the second date selected equals the prev date selected
            if(prevdate==null || prevdate==datestr) 
            {
                counter++;
            }
            else    //the second selected date is a different date, reset counter to 1
            {
                counter = 1;
            }
            if(counter==2) //user has selected the date consecutively. link to bigger calendar activitypage
            {
                linkTopage(datestr);
            }
            prevdate = datestr; //assigns the date selected to the prevdate variable
            displayTE(m,d); //calls function to display the activity and event below the main calendar
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

//returns the tip associated with the given day and month; month = 0(jan), 1(feb); day = 1,2..,31
function getActivity(day,month){
	return tipsArray[month][day];
}

//function to display today's event below the main calendar
function getTE(m,d){
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

function displayTE(m,d)
{
    document.getElementById('activity').innerHTML = "Activity: <br>" + 
    getActivity(d,m) + "<br><br>"+getTE(m,d);
}