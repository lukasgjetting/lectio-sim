(function() {
	const Room = require('./room.js');
	
	// Will teleport a person to the first teleporter in this waypoint's list of neighbors.
	// The teleporter can be set to preserve the persons x and/or y coordinates relative to
	// the teleporter when teleporting. This is useful if you for exmaple want to have two
	// wide teleporters and don't want to the person jumping from one side to the other when
	// they teleport.
	module.exports = class Teleporter extends Room {
		constructor(position, width, height, neighbors, preserveX, preserveY) {
			super(position, width, height, neighbors);
			this.preserveX = preserveX;
			this.preserveY = preserveY;
		}
	};
}());