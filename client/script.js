var socket = new WebSocket("ws://:");

var intervals = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0
};

var directionBtns = document.getElementsByClassName("change-direction-button");

for (var i = 0; i < directionBtns.length; i++) {
	directionBtns[i].addEventListener('mousedown', moveMouse, false);
	directionBtns[i].addEventListener('touchstart', moveMouse, false);
	
	directionBtns[i].addEventListener('mouseup', onMouseUp, false);
	directionBtns[i].addEventListener('touchend', onMouseUp, false);
}

function moveMouse() {
	var direction = this.getAttribute("data-direction");
	var numberOfPixels = 10;
	intervals[direction] = setInterval(function() {
		var data = JSON.stringify({ 
			actionType: "mouseMove",
			direction: direction, 
			pixels: numberOfPixels
		});
		socket.send(data);
		console.log(direction, 'send data')
		numberOfPixels += 5;
	}, 100)
}

function onMouseUp() {
	var direction = this.getAttribute("data-direction");
	clearInterval(intervals[direction]);
}

function mouseClick() {
	var data = JSON.stringify({
		actionType: "mouseLeftClick"
	});

	socket.send(data);
}

function onKeyPressed(key) {
	var data = JSON.stringify({
		actionType: "keyPressed",
		key: key
	});
	socket.send(data);
}

function onScroll(direction) {
	var data = JSON.stringify({
		actionType: "scroll",
		direction: direction
	});
	socket.send(data);
}

