(function () {
	const people = require('../peopleManager.js').people;
	const layout = require('../layout.js');
	const config = require('../config.js');
	const Room = require('../waypoints/room.js');
	const Teleporter = require('../waypoints/teleporter.js');

	module.exports = {
		render
	};

	function render(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		if (config.paths.draw) {
			drawPaths(ctx);
		}
		if (config.waypoints.draw) {
			drawWaypoints(ctx);
		}
		if (config.people.draw) {
			drawPeople(ctx);
		}
	}

	function drawPeople(ctx) {
		for (let i = 0; i < people.length; i++) {
			ctx.beginPath();
			ctx.arc(people[i].position.x, people[i].position.y, config.people.radius, 0, Math.PI * 2);
			ctx.fillStyle = people[i].color;
			ctx.fill();
		}
	}

	function drawWaypoints(ctx) {
		for (let i = 0; i < layout.waypoints.length; i++) {
			if (layout.waypoints[i] instanceof Teleporter) {
				drawTeleporter(ctx, layout.waypoints[i]);
			} else if (layout.waypoints[i] instanceof Room) {
				drawRoom(ctx, layout.waypoints[i]);
			} else {
				drawWaypoint(ctx, layout.waypoints[i]);
			}
		}
	}

	function drawWaypoint(ctx, waypoint) {
		ctx.beginPath();
		ctx.arc(waypoint.position.x, waypoint.position.y, config.waypoints.radius, 0, Math.PI * 2);
		ctx.fillStyle = config.waypoints.color;
		ctx.fill();
		if (config.waypoints.drawIds) {
			ctx.fillStyle = config.waypoints.idColor;
			ctx.fillText(layout.waypoints.indexOf(waypoint), waypoint.position.x, waypoint.position.y);
		}
	}

	function drawRoom(ctx, room) {
		ctx.beginPath();
		ctx.rect(
			room.position.x - room.width / 2,
			room.position.y - room.height / 2,
			room.width,
			room.height
		);
		ctx.fillStyle = config.waypoints.rooms.color;
		ctx.fill();
		if (config.waypoints.rooms.drawIds) {
			ctx.fillStyle = config.waypoints.rooms.idColor;
			ctx.fillText(layout.waypoints.indexOf(room), room.position.x, room.position.y);
		}
	}

	function drawTeleporter(ctx, teleporter) {
		ctx.beginPath();
		ctx.rect(
			teleporter.position.x - teleporter.width / 2,
			teleporter.position.y - teleporter.height / 2,
			teleporter.width,
			teleporter.height
		);
		ctx.fillStyle = config.waypoints.rooms.teleporters.color;
		ctx.fill();
		if (config.waypoints.drawIds) {
			ctx.fillStyle = config.waypoints.rooms.teleporters.idColor;
			ctx.fillText(layout.waypoints.indexOf(teleporter), teleporter.position.x, teleporter.position.y);
		}
	}

	function drawPaths(ctx) {
		const lines = [];
		for (let i = 0; i < layout.waypoints.length; i++) {
			for (let j = 0; j < layout.waypoints[i].neighbors.length; j++) {
				const waypoint1 = layout.waypoints[i];
				const waypoint2 = layout.waypoints[layout.waypoints[i].neighbors[j]];
				const isTeleporterPath = waypoint1 instanceof Teleporter &&
										 waypoint2 instanceof Teleporter;
				const line = {
					point1: waypoint1.position,
					point2: waypoint2.position
				};
				if (lines.indexOf(line) === -1) {
					lines.push(line);
					ctx.beginPath();
					ctx.moveTo(line.point1.x, line.point1.y);
					ctx.lineTo(line.point2.x, line.point2.y);
					ctx.lineWidth = config.paths.width;
					if (isTeleporterPath) {
						ctx.strokeStyle = config.paths.teleportPathColor;
					} else {
						ctx.strokeStyle = config.paths.color;
					}
					if (!isTeleporterPath || config.paths.drawTeleportPaths) {
						ctx.stroke();
					}
				}
			}
		}
	}
}());
