(function () {
	const Vector = require('../vector.js');

	module.exports = class Waypoint {
		constructor(position, neighbors) {
			this.position = position;
			if (position === undefined) {
				this.position = new Vector();
			}
			this.neighbors = neighbors;
			if (neighbors === undefined) {
				this.neighbors = [];
			}
		}
	};
}());
