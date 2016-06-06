const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const students = [];
for (var i = 0; i < 10; i++) {
	students.push(
		new Student(
			waypoints[getRandomInt(0,10)], waypoints[getRandomInt(0,10)], 3, getRandomColor()
		)
	);
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
	if (student.shouldMove && student.innerTarget !== undefined) {
		const direction = student.innerTarget.Sub(student.position);
		const normalised = direction.Normalise();
		student.position = student.position.Add(normalised.Multiply(student.speed));
		const left  = student.innerTarget.x - 6 / 2;
		const right = student.innerTarget.x + 6 / 2;
		const upper = student.innerTarget.y - 6 / 2;
		const lower = student.innerTarget.y + 6 / 2;
		if (student.position.x > left &&
			student.position.x < right &&
			student.position.y > upper &&
			student.position.y < lower) {
				if (student.route[student.routeIndex].wait !== undefined ||
					student.route.length - 1 === student.routeIndex) {
					student.shouldMove = false;
					if (allStill() && false) {
						setTimeout(function() {
							for (var i = 0; i < students.length; i++) {
								students[i].shouldMove = true;
								student.nextWaypoint();
							}
						}, student.route[student.routeIndex].wait * 1000);
					}
				} else {
					student.nextWaypoint();
				}
		}
		
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPaths();
	drawWaypoints();
	drawStudents();
}

function drawStudents() {
	for (var i = 0; i < students.length; i++) {
		move(students[i]);
		ctx.beginPath();
		ctx.arc(students[i].position.x, students[i].position.y, 10, 0, Math.PI * 2);
		ctx.fillStyle = students[i].color;
		ctx.fill();
	}
}

function drawWaypoints() {
	for (var i = 0; i < waypoints.length; i++) {
		if (waypoints[i].draw) {
			ctx.beginPath();
			ctx.rect(waypoints[i].position.x - waypoints[i].width/2,
					 waypoints[i].position.y - waypoints[i].height/2,
					 waypoints[i].width, waypoints[i].height);
			ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
			ctx.fill();
			ctx.fillStyle = '#000000';
			ctx.fillText(i, waypoints[i].position.x, waypoints[i].position.y);
		}
	}
}

function drawPaths() {
	let lines = [];
	for (let i = 0; i < waypoints.length; i++) {
		for (let j = 0; j < waypoints[i].neighbors.length; j++) {
			let line = {
				point1: waypoints[i].position,
				point2: waypoints[waypoints[i].neighbors[j]].position
			};
			if (lines.indexOf(line) == -1) {
				lines.push(line);
				ctx.beginPath();
				ctx.moveTo(line.point1.x, line.point1.y);
				ctx.lineTo(line.point2.x, line.point2.y);
				ctx.stroke();
			}
		}
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