var counter = 0;    //counter to count how many times that particular date is clicked
var prevdate = null;    //variable to store previous date selected
var date = new Date();
//loads the calendar for the current month
$(function() {
    if(localStorage.lang=="ESP"){//generate the calendar in spanish
        $('#calendar').datepicker({
        inline: true,
        firstDay: 0,
        showOtherMonths: true,
        async:false,
        prevText: 'Ant',
        nextText: 'Sig',
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
        onChangeMonthYear:function(year,month,inst){
            //checks if you are on the current month, if not, switching to other months will highlight the 1st day of that month.
            if(!(month-1 == date.getMonth()))
            $(this).datepicker( "setDate", month + '/1/' + year );
            //checks if you return to the current month. If so, prints the activities and events of current day
            if(month-1 == date.getMonth())
               displayTE(date.getMonth(),date.getDate()-1);
            else//prints the activities and events of the first day of that month
                displayTE(month-1,0);
        },
        onSelect: function(datestr){
            var m = parseInt(datestr.substring(0,2),10)-1; //selected box month's int value from 0 to 11
            var d = parseInt(datestr.substring(3,5),10)-1; //selected box day's int value from 0 to 30
            //checks if it is the first time the date is selected
            //checks if the second date selected equals the prev date selected
            if(prevdate==null || prevdate==datestr) 
                counter++;
            else    //the second selected date is a different date, reset counter to 1
                counter = 1;
            if(counter==1)
               $( "#datepicker" ).datepicker("option", "defaultDate", d);
            if(counter==2) //user has selected the date consecutively. link to bigger calendar activitypage
            {
                linkTopage(datestr);
            }
            prevdate = datestr; //assigns the date selected to the prevdate variable
            displayTE(m,d); //calls function to display the activity and event below the main calendar
        },     
      });
    }
else{   //generate the calendar in english
     $('#calendar').datepicker({
        inline: true,
        firstDay: 0,
        showOtherMonths: true,
        async:false,
        onChangeMonthYear:function(year,month,inst){
            //checks if you are on the current month, if not, switching to other months will highlight the 1st day of that month.
            if(!(month-1 == date.getMonth()))
            $(this).datepicker( "setDate", month + '/1/' + year );
            //checks if you return to the current month. If so, prints the activities and events of current day
            if(month-1 == date.getMonth())
               displayTE(date.getMonth(),date.getDate()-1);
            else//prints the activities and events of the first day of that month
                displayTE(month-1,0);
        },
        onSelect: function(datestr){
            var m = parseInt(datestr.substring(0,2),10)-1; //selected box month's int value from 0 to 11
            var d = parseInt(datestr.substring(3,5),10)-1; //selected box day's int value from 0 to 30
            //checks if it is the first time the date is selected checks if the second date selected equals the prev date selected
            if(prevdate==null || prevdate==datestr) 
                counter++;
            else    //the second selected date is a different date, reset counter to 1
                counter = 1;
            if(counter==1)
               $( "#datepicker" ).datepicker("option", "defaultDate", d);
            if(counter==2) //user has selected the date consecutively. link to bigger calendar activitypage
            {
                linkTopage(datestr);
            }
            prevdate = datestr; //assigns the date selected to the prevdate variable
            displayTE(m,d); //calls function to display the activity and event below the main calendar
        },     
      });
    }
});

$(document).ready(function() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth();
   //resizeactivitydiv();
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
    document.location.href = "../home/index.html";
}

//function to go to help page
function goHelp()
{
    document.location.href = "../help/Calendar.html";
}

//returns the tip associated with the given day and month; month = 0(jan), 1(feb); day = 1,2..,31
function getActivity(day,month){
    if(localStorage.lang=="ENG")
	   return tipsArray[month][day];
    else
        return tipsArray_ESP[month][day];
}

//function to display today's event below the main calendar
function displayTE(m,d)
{
    if(localStorage.lang=="ENG")
        var activity = "Activity";
    else
        var activity = "actividad";
    document.getElementById('activity').innerHTML = "<span id='activity-head'>"+activity+"</span>" + 
    getActivity(d,m) + "<br><br>";
    getLibraryEvent(d+1,m);
}