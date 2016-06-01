const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const students = [];
for (var j = 0; j < 4; j++) {
	for (var i = 0; i < 25; i++) {
		students.push(
			new Student(
				new Vector(
					0 + getRandomInt(0, 800),
					600 + getRandomInt(-50, 50)
				), 6*j, getRandomDouble(3, 3.5), getRandomColor()
			)
		);
	}
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback, element) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

animate();

function animate() {
	requestAnimFrame(animate);
	draw();
}

function move(student) {
	if (student.shouldMove) {
		const direction = student.waypoint.Sub(student.position);
		const normalised = direction.Normalise();
		student.position = student.position.Add(normalised.Multiply(student.speed));
		const left  = student.waypoint.x - 6 / 2;
		const right = student.waypoint.x + 6 / 2;
		const upper = student.waypoint.y - 6 / 2;
		const lower = student.waypoint.y + 6 / 2;
		if (student.position.x > left &&
			student.position.x < right &&
			student.position.y > upper &&
			student.position.y < lower) {
				if (waypoints[student.waypointIndex].wait !== undefined) {
					student.shouldMove = false;
					if (allStill()) {
						setTimeout(function() {
							for (var i = 0; i < students.length; i++) {
								students[i].shouldMove = true;
								students[i].waypointIndex = (students[i].waypointIndex + 1) % waypoints.length;
								students[i].setWaypoint(students[i].waypointIndex);
							}
						}, waypoints[student.waypointIndex].wait * 1000);
					}
				} else {
					student.waypointIndex = (student.waypointIndex + 1) % waypoints.length;
					student.setWaypoint(student.waypointIndex);
				}
		}
		
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < waypoints.length; i++) {
		ctx.beginPath();
		ctx.rect(waypoints[i].position.x - waypoints[i].width/2,
				 waypoints[i].position.y - waypoints[i].height/2,
				 waypoints[i].width, waypoints[i].height);
		ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
		ctx.fill();
	}
	for (var i = 0; i < students.length; i++) {
		move(students[i]);
		ctx.beginPath();
		ctx.arc(students[i].position.x, students[i].position.y, 10, 0, Math.PI * 2);
		ctx.fillStyle = students[i].color;
		ctx.fill();
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDouble(min, max) {
	return Math.random() * (max - min + 1) + min;
}

function getRandomColor() {
	return 'rgba(' + getRandomInt(0,255) + ', ' + getRandomInt(0,255) + ', ' + getRandomInt(0,255) + ', 1)';
}

function allStill() {
	for (var i = 0; i < students.length; i++) {
		if (students[i].shouldMove) return false;
	}
	return true;
}