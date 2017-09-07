var express = require('express');
var router = express.Router();

// Require the filesystem module.
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Synchronously read in the scientist json file and parse the json into the variable.
  var scientistList = JSON.parse(fs.readFileSync('scientists.json'));
  // Render the scientist page, giving it the required variables
  res.render('scientists', { pageTitle: 'The Best Scientists Ever', 
							 title: 'All Scientists', 
							 addScientistLink: 'scientist/suggest', 
							 addScientist: 'Suggest a scientist', 
							 scientistList: scientistList});
});

module.exports = router;
