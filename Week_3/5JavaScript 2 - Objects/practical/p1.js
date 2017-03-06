// A function that accepts a random number
function randomInt(randomNum){
	
	// Find a random number and store it in randomNum 
	return Math.floor(Math.random() * (randomNum));
}
	
	console.log(randomInt(10000));