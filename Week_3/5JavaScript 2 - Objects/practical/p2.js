function randomArray(n){
	
	// Returns an array of length n
	var rowColArray = new Array(n);
	
	for(var i = 0; i < rowColArray.length; i++){
		
		var randNum = Math.floor((Math.random() * (1,9)));
		rowColArray[i] = randNum;
		console.log(rowColArray[i]);
	}
}

randomArray(5);