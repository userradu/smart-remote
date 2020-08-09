var socket = new WebSocket("ws://127.0.0.1:8765");

socket.onopen = function(event) { }

socket.onmessage = function(event) {
	console.log(event.data);
}

function moveMouse(direction) {
	var data = JSON.stringify({ 
		actionType: "mouseMove",
		direction: direction, 
		pixels: 100 
	});
	socket.send(data);
}

function mouseClick() {
	var data = JSON.stringify({
		actionType: "mouseLeftClick"
	});

	socket.send(data);
}

