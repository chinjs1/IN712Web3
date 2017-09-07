var ws = new WebSocket("ws://localhost:3000");

// Create a new variable which will be used to assign a color.
var assignedColor = null;

ws.onopen = function() {
    setTitle("Connected to Cyber Chat");
};

ws.onclose = function() {
    setTitle("DISCONNECTED");
};

ws.onmessage = function(payload) {
	var messageDetails = JSON.parse(payload.data);
	
	// If there is no assigned color,
	if (assignedColor == null) {
		
		// grab the color from the JSON.
		assignedColor = messageDetails["color"];
	}
    printMessage(messageDetails); 
};

document.forms[0].onsubmit = function () {
    var input = document.getElementById('message');
	var userSendMessage = {
			
		color: assignedColor,
		message: input.value
	}
	
	ws.send(JSON.stringify(userSendMessage));
    input.value = '';
};

function setTitle(title) {
    document.querySelector('h1').innerHTML = title;
}

function printMessage(message) {
    var p = document.createElement('p');
	if (message["message"] != "Welcome to cyber chat") {
		
		p.classList.add(message["color"]);
	}

    p.innerText = message["message"];
    document.querySelector('div.messages').appendChild(p);
}