function checkAlpha(string) {
    var pattern = new RegExp([^a-zA-Z]);
    if(pattern.test(string))
        alert("invalid string");
    else alert("Good job");
}

checkAlpha("hello world");