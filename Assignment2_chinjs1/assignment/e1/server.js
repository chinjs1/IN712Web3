var http = require("http");
var fs = require('fs');

var server = http.createServer(function(request, response) {
	
	var regexCss = request.url.match("[aA-zZ0-9]*.css");
	var regexJpg = request.url.match("[aA-zZ0-9]*.jpg");
	
	if (regexCss !== null) {
		response.writeHead(200, {"Content-Type": "text/css"});
		
			fs.readFile("./public/style.css", function(err, content){
				
				response.write(content);
				response.end();
			});

	} else if (regexJpg !== null){
		response.writeHead(200, {"Content-Type": "image/jpeg"});
	
			fs.readFile("./public/apollo11.jpg", function(err, content){
				
				response.write(content);
				response.end();
			}); 
			
	} else {
		response.writeHead(200, {"Content-Type": "text/html"});
			
			fs.readFile("./public/index.html", function(err, content){
				
				response.write(content);
				response.end();
			}); 
	}
});

server.listen(3000);
console.log("Server is listening");