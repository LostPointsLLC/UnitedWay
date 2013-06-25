 /*

    app.js

    Main Javascript entry point.
    Please include all other .js files in HTML file before including this file
    
 */ 

// Main program
var my_div = null;
var newDiv = null;



// This function adds a DOM element to the HTML document
// @param : none

function addElement () {
  var newDiv = document.createElement("div"); // create new div tag
  var newContent = document.createTextNode("Hi there and greetings!"); // tag text
  newDiv.appendChild(newContent); //add the text node to the newly created div.
  // add the newly created element and its content into the DOM
  my_div = document.getElementById("header");
  newDiv.setAttribute("name", "johan");
  //document.body.insertBefore(newDiv, my_div);
  my_div.parentNode.insertBefore(newDiv, my_div.nextSibling);
}

/*
	@param: Receives Child object, 

*/

function addChild () {
  // create a new div element
  // and give it some content
  var newDiv = document.createElement('div');
  //var newContent = document.createTextNode("Hi there and greetings!");
  
  var entrails = "<progress value='22' max='100'></progress>";
  newDiv.innerHTML = entrails;
  //<progress value="22" max="100"></progress>

 // newDiv.appendChild(newContent); //add the text node to the newly created div.
  

  // add the newly created element and its content into the DOM
  my_div = document.getElementById("header");
  newDiv.setAttribute("name", "johan");
  //document.body.insertBefore(newDiv, my_div);
  my_div.parentNode.insertBefore(newDiv, my_div.nextSibling);
}


function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/*
	addElement();
	addElement();
	addElement();
	addP();
	addP();

	*/
var Timothy = new Child("Tim", 3, "MALE"); // Declare the object
//Timothy.dossier(); // Use object method
