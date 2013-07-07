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

function goHelp()
{
    document.location.href = "../help/help1.html";
}