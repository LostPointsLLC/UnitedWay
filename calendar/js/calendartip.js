$(document).ready(function() {
    param = sessionStorage.date;
    var day = parseInt(param.substr(3),10);
    var month = parseInt(param,10);
    updateDate(day,month-1);
});

