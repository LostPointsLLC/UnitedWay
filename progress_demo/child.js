// Define Child Class

/*
	A child object should hold the name, age, gender
	as well as collections of categories, 

	DEPENDENCIES: 

*/
function Child(name, age, gender) {
	// Basic properties
	this.name = name;
	this.age = age;
	this.gender = gender;

	// Tasks


	// Tips
}

/*
	Methods for child
*/

// Prints information on a child object on the browser's developer console
Child.prototype.dossier = function () {
	console.log("The name is" + this.name);
	if (this.gender == "MALE")
		console.log("This child is a boy");
	else 
		console.log("This child is a girl");
	console.log(this.name + " is " + this.age.toString() + " years old");
}
