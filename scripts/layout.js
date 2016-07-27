(function() {
	const Vector = require('./vector.js');
	const Waypoint = require('./waypoint.js');

	const waypoints = [
		new Waypoint(new Vector(90, 300),  30, 30, [1]),
		new Waypoint(new Vector(175, 300), 30, 30, [0,2,3]),
		new Waypoint(new Vector(175, 425), 30, 30, [1,9]),
		new Waypoint(new Vector(175, 175), 30, 30, [1,4]),
		new Waypoint(new Vector(290, 175), 30, 30, [3,5]),
		new Waypoint(new Vector(290, 55),  30, 30, [4,6]),
		new Waypoint(new Vector(350, 55),  30, 30, [5,7]),
		new Waypoint(new Vector(350, 175), 30, 30, [6,8]),
		new Waypoint(new Vector(500, 175), 30, 30, [7,10]),
		new Waypoint(new Vector(500, 425), 30, 30, [10,2]),
		new Waypoint(new Vector(500, 300), 30, 30, [8,9])
	];
	
	module.exports = {
		waypoints: waypoints
	};
}());