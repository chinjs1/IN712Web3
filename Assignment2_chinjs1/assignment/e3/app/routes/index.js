var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Render the index template - passing in these vars.
  res.render('index', { pageTitle: 'The Best Scientists', 
						title: 'The Best Scientists Ever', 
						description: 'for science nerds', 
						navText: 'List of top-notch scientists', 
						navLink: 'scientists' });
});

module.exports = router;
