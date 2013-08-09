//default language is English
localStorage.lang = "ENG";

function handleclick(myRadio) {
    //alert('Value: ' + myRadio.value);
    localStorage.lang = myRadio.value;
    //alert(sessionStorage.lang);
}