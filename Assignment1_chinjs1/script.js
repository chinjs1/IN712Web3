/*
 =====================================================================================================================================
 || * Author: Joshua Chin																											||
 || * Project file name: script.js																								    ||
 || * Date: 30th March 2017                                                                                                         ||
 || * Purpose: Web 3, Assignment 1.                                                                                                 ||
 || * Description: This file is for creating JS functionallity. This is an external script with functions							||
 || * that are called when the user clicks the submit button on the html webpage													||
 ||																																	||
 =====================================================================================================================================
*/

// Global variables.
var pinotNoirSelected;
var chardonaySelected;
var sauvignonBlancSelected;
var reislingSelected;

var emailChecker;
var shippingChecker;
var wineChecker;

var mainCanvas;
var mainContext;
var xLoc;
var shippingImg;

var taxPercentage;
var totalPrice;

// ====================================================================================================================================
	
	// By default, will fire when the page loads. When the user hits the button to get the toal cost,
	// The js will fire up in the background.
	window.onload = function(){
		
		pinotNoirSelected = document.getElementById("pinotAmount");
		chardonaySelected = document.getElementById("chardonayAmount");
		sauvignonBlancSelected = document.getElementById("sauvignonAmount");
		reislingSelected = document.getElementById("reislingAmount");
		
		emailChecker = document.getElementById("email");
		shippingChecker = document.getElementById("selectStateOption");
		wineChecker = document.getElementsByName("wine");
		
		mainCanvas = document.getElementById("animation");
		mainContext = mainCanvas.getContext("2d");
		xLoc = 0;
		shippingImg = new Image();
		shippingImg.src = "images/packageShipment.png";		
		
		taxPercentage = 0;
		totalPrice = 0;
		
		// Run the js file if the user hits the button
		var btnEstimate = document.getElementById("estimateTotal");
		btnEstimate.onclick = estimateTotal;   
	} // End onload function
	
// ====================================================================================================================================
	
	// This function checks to see if the user has checked a state, input a proper email and input an amount of wine.
	// If they have, make an AJAX request. Else, output an alert message.
	function estimateTotal(){
		
		// Make sure the user has selected a state
		if(stateQualifies()){	
		
			// Make sure the user has used a correct email
			if(emailQualifies()){
				
				// Make sure the user has input a wine amount 
				if(quantitySelected() > 0){

				   getTaxFromUrlAjax();
				   storingBottlesaAndState();
			
				} // End quantitySelected
				else{
					
					alert("Please select wine amount");
					// wineChecker.focus();
				
				}			
			} // End emailQualifies
			else{
				
				alert("Please enter a valid email");	
				emailChecker.focus();
			}
		} // End stateQualifies
		else{
			
			alert("Please select a shipping state");
			shippingChecker.focus();
		}
	} // End estimateTotal

// ====================================================================================================================================
	
	// Check to see if the user has selected a shipping state.
	function stateQualifies(){
		
		// Grab the ID of selectbox and store the contents of it in a variable called stateOption.
		var stateOption = document.getElementById("selectStateOption").value;
		
		// If the user has no chosen a shipping state...
		if(stateOption == "noSelect"){

		// Return false and output an alert error message.
		return false;
		}
		// Else, they qualify.
		else{
			return true;
		}
	} // End stateQualifies.

// ====================================================================================================================================

	// Check to see if the user has entered a valid email address.
	function emailQualifies(){
		
		// Get the ID of the email holder and store it in emailOption.
		var emailOption = document.getElementById("email").value;
		
		// Store the email regex checker in a var.
		var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		
		// Test if the email entered passes the regex test.
		var emailValid = emailRegex.test(emailOption);
		
		// If its a valid email.. continue,
		if(emailValid){
			return true;
		}
		// else return an error.
		else{
			return false;
		}
	} // End emailQualifies.
	
// ====================================================================================================================================	
	
	// Totals up the amount of wine that a user selects.
	function quantitySelected(){
		
		var arr = document.getElementsByName("wine");
		var total = 0;
		for(var i = 0; i < arr.length; i++){
		   if(parseInt(arr[i].value))
			  total += parseInt(arr[i].value);
		}
		return total;	
	} // End quantitySelected

// ====================================================================================================================================	
	
	function getTaxFromUrlAjax(){
		
		var request = new XMLHttpRequest();
		request.open('GET', 'https://dl.dropboxusercontent.com/u/10089854/Web3/Assignment1/stateTaxInfo.json');
		
		request.onreadystatechange = function(){
			
			if ((request.readyState === 4) && (request.status === 200)){
				
				totalPrice = 0;
				var taxValues = JSON.parse(request.responseText);
				var taxSelected = document.getElementById("selectStateOption").value;
				
			    taxPercentage = taxValues[taxSelected];
				totalPrice = winePrice() + totalShippingCost();
				totalPrice += totalTaxCost();
				
				document.getElementById("total").value = "$" + totalPrice.toFixed(2);
				displayUserPurchaseInfo();
				setInterval(shippingAnimation,20);
			}
		}
		request.send();
	} // End getTaxFromUrlAjax
	
// ====================================================================================================================================
	
	// Calculates the price of wine
	function winePrice(){
		
		// Grab the ID of wine and store them in var's
		var winePrice = 0;
		var pinotBottles = document.getElementById("pinotAmount");
		var savBottles = document.getElementById("sauvignonAmount");
		var chardBottles = document.getElementById("chardonayAmount");
		var reisBottles = document.getElementById("reislingAmount");
		
		// Get the ID of the wine and find its value - add the appropriate value to it and store it in a variable.
		pinotNoirSelected = pinotBottles.value * 10;
		chardonaySelected = chardBottles.value * 8;
		sauvignonBlancSelected = savBottles.value * 10;
		reislingSelected = reisBottles.value * 12; 
		
		// Add up all the wine that has been selected and store it in a variable.
		winePrice = pinotNoirSelected + chardonaySelected + sauvignonBlancSelected + reislingSelected;
				
		return winePrice;
	} // End winePrice.
	
// ====================================================================================================================================	
	
	// This function gets the total cost of shipping for which the user selects.
	function totalShippingCost(){
		
		// Grab the ID of the radiobuttons and store them in the appropriate variables.
		var shippingPrice = 0;
		
		// If the post radiobutton has been checked,
		if(document.getElementById("nzPost").checked == true){
			
			// Add up the amount of wine bottles chosen and times it by $2.
			shippingPrice = quantitySelected() * 2;
		}
		
		// If the courier radiobutton has been checked,
		if(document.getElementById("nzCourier").checked == true){
			
			// Add up the amount of wine bottles chosen and times it by $3.
			shippingPrice = quantitySelected() * 3;
		}
	
		return shippingPrice;
	} // End totalShippingCost.
	
// ====================================================================================================================================	
	
	// Calculates the total tax price 
	function totalTaxCost(){
		
		return totalPrice * taxPercentage;
	} // End totalTaxCost.
	
// ====================================================================================================================================	
	
	function taxDisplay(){
		
		var selectedState = document.getElementById("selectStateOption").value;
		var displayTax = taxPercentage * 100 / 1;
		var outputTax = displayTax.toFixed(2) + "% (" + selectedState + ")";
		return outputTax;
	} // End taxDisplay.
	
// ====================================================================================================================================	
	
	// When the user clicks the estimate button output how many bottles they ordered, total shipping cost and total tax added.
	function displayUserPurchaseInfo(){
		
		// Grab the id of the specific paragraph and use the innerHTML command to output results - concatenate with the correct functions.
		document.getElementById("outputBottles").innerHTML = "Total Bottles Ordered: " + quantitySelected();
		document.getElementById("outputShipping").innerHTML = "Total Shipping Cost: $" + totalShippingCost().toFixed(2);
		document.getElementById("outputTaxPercentage").innerHTML = "Tax: " + taxDisplay();
		document.getElementById("outputTax").innerHTML = "Total Tax Added: $" + totalTaxCost().toFixed(2);		
	} // End displayUserPurchaseInfo
	
// ====================================================================================================================================	
	
	// Using web storage to store the state of how many bottles were ordered and which shipping option the user chose.
	function storingBottlesaAndState(){

		var purchaseDetails = {
			
			bottleTotal: quantitySelected(),
			stateChosen: document.getElementById("selectStateOption").value
		};
		
		var json = JSON.stringify(purchaseDetails);
		localStorage.setItem("purchaseDetails", json);
	} // End localStorage 
	
// ====================================================================================================================================	
	
	// This function sets a img in a canvas and will constantly loop. 
	function shippingAnimation(){
		
		mainContext.clearRect(0, 0, 325, 200);
		mainContext.drawImage(shippingImg, xLoc, 0);
		
		// Keep moving while the location is less then the canvas.
		if(xLoc < 325){
			xLoc++;
		}
		
		// Reset image.
		else{
			xLoc = 0;
		}
	} // End shippingAnimation.
	
// ====================================================================================================================================	
