(function() {
	const students = require('../students.js');
	const layout = require('../layout.js');
	const config = require('../config.js');

	module.exports = {
		render: render
	};
		
	function render(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		if (config.paths.draw) {
			drawPaths(ctx);
		}
		if (config.waypoints.draw) {
			drawWaypoints(ctx);
		}
		if (config.students.draw) {
			drawStudents(ctx);
		}
	}

	function drawStudents(ctx) {
		for (var i = 0; i < students.length; i++) {
			ctx.beginPath();
			ctx.arc(students[i].position.x, students[i].position.y, config.students.radius, 0, Math.PI * 2);
			ctx.fillStyle = students[i].color;
			ctx.fill();
		}
	}
	
	function drawWaypoints(ctx) {
		for (var i = 0; i < layout.waypoints.length; i++) {
			if (layout.waypoints[i]) {
				ctx.beginPath();
				ctx.rect(
					layout.waypoints[i].position.x - layout.waypoints[i].width/2,
					layout.waypoints[i].position.y - layout.waypoints[i].height/2,
					layout.waypoints[i].width,
					layout.waypoints[i].height
				);
				ctx.fillStyle = config.waypoints.color;
				ctx.fill();
				if (config.waypoints.drawNumbers) {
					ctx.fillStyle = '#000000';
					ctx.fillText(i, layout.waypoints[i].position.x, layout.waypoints[i].position.y);
				}
			}
		}
	}
	
	function drawPaths(ctx) {
		let lines = [];
		for (let i = 0; i < layout.waypoints.length; i++) {
			for (let j = 0; j < layout.waypoints[i].neighbors.length; j++) {
				let line = {
					point1: layout.waypoints[i].position,
					point2: layout.waypoints[layout.waypoints[i].neighbors[j]].position
				};
				if (lines.indexOf(line) == -1) {
					lines.push(line);
					ctx.beginPath();
					ctx.moveTo(line.point1.x, line.point1.y);
					ctx.lineTo(line.point2.x, line.point2.y);
					ctx.lineWidth = config.paths.width;
					ctx.strokeStyle = config.paths.color;
					ctx.stroke();
				}
			}
		}
	}
}());