//default language is English
sessionStorage.lang = "ENG";

function handleclick(myRadio) {
    //alert('Value: ' + myRadio.value);
    sessionStorage.lang = myRadio.value;
    //alert(sessionStorage.lang);
}