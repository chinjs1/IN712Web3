// Finding the length of an array
function carArray(){
	
	var cars = new Array("BMW", "Mercedes", "Toyota", "Ferarri", "Ford");
	console.log("Array length is: " + cars.length);
}

// Sort array into alphabetical order
function sortCars(){
	
	var cars = new Array("BMW", "Mercedes", "Toyota", "Ferarri", "Ford");
	cars.sort();
	console.log(cars);
}

// Reverse the order of the array
function reverseCars(){
	
	var cars = new Array("BMW", "Mercedes", "Toyota", "Ferarri", "Ford");
	cars.reverse();
	console.log(cars);
}

// Remove the last element of the array
function removeLastCar(){
	
	var cars = new Array("BMW", "Mercedes", "Toyota", "Ferarri", "Ford");
	cars.pop();
	console.log(cars);
}

// Add to the end of the array
function addCar(){
	
	var cars = new Array("BMW", "Mercedes", "Toyota", "Ferarri", "Ford");
	cars.push("Honda");
	console.log(cars);
}

// Remove the first element of the array
function removeFirstCar(){

	var cars = new Array("BMW", "Mercedes", "Toyota", "Ferarri", "Ford");
	cars.shift();
	console.log(cars);
}

// Add first car to array
function addFirstCar(){
	
	var cars = new Array("BMW", "Mercedes", "Toyota", "Ferarri", "Ford");
	cars.unshift("Hyundai");
	console.log(cars);	
}

// Change content of array to string
function convertContentsCar(){
	
	var cars = ["BMW", "Mercedes", "Toyota", "Ferrari", "Ford"];
	var stringCar = cars.join();
	console.log(stringCar);
}

// Change the second element of the array to Mazda
function changeSecondElementCar(){
	
	var cars = ["BMW", "Mercedes", "Toyota", "Ferrari", "Ford"];
	cars.splice(1,1,"Mazda");
	console.log(cars);
}

// Inject 2 new elements in the array starting at index 2
function injectCars(){
	
	var cars = ["BMW", "Mercedes", "Toyota", "Ferrari", "Ford"];
	cars.splice(2, 0, "GTR", "Mazda");
	console.log(cars);
}

// Concatenate array to itself
function concatenateCars(){
	
	
}
carArray();
sortCars();
reverseCars();
removeLastCar();
addCar();
removeFirstCar();
addFirstCar();
convertContentsCar();
changeSecondElementCar();
injectCars();