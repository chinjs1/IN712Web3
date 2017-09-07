var express = require('express');
var router = express.Router();

// Require the filesystem module.
var fs = require('fs');

// Synchronously read in the scientist json file and parse the json into the variable.
var scientistList = JSON.parse(fs.readFileSync('scientists.json'));

// Define a route for /suggest as a GET request.
router.get('/suggest', function(req, res, next) {

  // Render the suggestscientest template for the user to fill out the form.
  res.render('scientistssuggest', {pageTitle: "Suggest a Scientist"});
});

// Define a route for /suggest as a POST request. 
router.post('/suggest', function(req, res, next) {
	
  // Build the object to store into the scientistList
  var scientist = {
	  firstname: req.body.firstname,
	  lastname: req.body.lastname,
	  years: req.body.years,
	  imageurl: req.body.imageurl,
	  bio: req.body.bio
  };
  
  // Add the scientist to the end of the object,
  scientistList.scientists.push(scientist);
  
  // Synchronously write out the file, converting the list to a JSON string,
  fs.writeFileSync('scientists.json', JSON.stringify(scientistList));
  
  // Render the submission page.
  res.render('submission', {pageTitle: 'The Best Scientists Ever!', firstname: req.body.firstname, lastname: req.body.lastname, bio: req.body.bio });
});

// Define a route for /lastname 
router.get('/:lastname', function(req, res, next) {
	
	// Loop over the list of scientists and find the matching lastname in the url. Break out when it is found.
	var scientist = {}
	for ( i = 0; i < scientistList.scientists.length; i++) {
		var currentScientist = scientistList.scientists[i];
		if (currentScientist.lastname.toLowerCase() == req.params["lastname"]) {
			scientist = currentScientist;
			break;
		}
	}
  // Render the scientistdetail
  res.render('scientistdetail', { pageTitle: 'The Best Scientists Ever', 
								  scientist: scientist});
});

module.exports = router;
