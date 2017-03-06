function randomArray(row,column){
	
	var arr = [];
	
	for(var i = 0; i < row; i++){
		
		var columns = [];
		
		for(var j = 0; j < column; j++){
			
			columns[j] = Math.floor(Math.random() * (9));
		}
		arr[i] = columns;
	}
	return arr;
}

console.log(randomArray(3,5));