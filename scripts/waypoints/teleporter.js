(function () {
	const Room = require('./room.js');

	// Will teleport a person to the first teleporter in this waypoint's list of neighbors.
	module.exports = class Teleporter extends Room {
		constructor(position, width, height, neighbors, preserveX, preserveY) {
			super(position, width, height, neighbors);
		}
	};
}());
