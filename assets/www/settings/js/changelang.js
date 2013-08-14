function handleclick(myRadio) {
    //alert('Value: ' + myRadio.value);
    localStorage.lang = myRadio.value;
    document.location.href = "index.html";
}