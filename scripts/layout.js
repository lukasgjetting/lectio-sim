(function() {
	const Vector = require('./vector.js');
	const Waypoint = require('./map/waypoint.js');
	const Room = require('./map/room.js');
	const Teleporter = require('./map/teleporter.js');

	const waypoints = [
		new Teleporter(new Vector(90, 300), 30, 30, [1,11]),
		new Room(new Vector(175, 300), 30, 30, [0,2,3]),
		new Room(new Vector(175, 425), 30, 30, [1,9]),
		new Room(new Vector(175, 175), 30, 30, [1,4]),
		new Room(new Vector(290, 175), 30, 30, [3,5]),
		new Room(new Vector(290, 55),  30, 30, [4,6]),
		new Room(new Vector(350, 55),  30, 30, [5,7]),
		new Room(new Vector(350, 175), 30, 30, [6,8]),
		new Room(new Vector(500, 175), 30, 30, [7,10]),
		new Room(new Vector(500, 425), 30, 30, [10,2]),
		new Room(new Vector(500, 300), 30, 30, [8,9,13]),
		new Teleporter(new Vector(600, 200), 30, 30, [0,12,13]),
		new Room(new Vector(600, 075), 30, 30, [11,13]),
		new Room(new Vector(600, 300), 30, 30, [11,15,10]),
		new Room(new Vector(750, 075), 30, 30, [12,15]),
		new Room(new Vector(750, 300), 30, 30, [13,13]),
	];
	
	let rooms = [];
	let teleporters = [];
	
	// Sort waypoints into sub-lists.
	for (var i = 0; i < waypoints.length; i++) {
		if (waypoints[i] instanceof Teleporter) {
			teleporters.push(waypoints[i]);
		} else if (waypoints[i] instanceof Room) {
			rooms.push(waypoints[i]);
		}
	}
	
	module.exports = {
		waypoints: waypoints,
		rooms: rooms,
		teleporters: teleporters,
	};
}());