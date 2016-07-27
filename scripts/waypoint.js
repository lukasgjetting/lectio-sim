(function() {
	const Vector = require('./vector.js');
	const utils = require('./utils.js');
	const config = require('./config.js');
	
	module.exports = class Waypoint {
		constructor(position, width, height, neighbors) {
			this.position = position;
			if (position === undefined) {
				this.position = new Vector();
			}
			this.width = width;
			if (width === undefined) {
				this.width = 0;
			}
			this.height = height;
			if (height === undefined) {
				this.height = 0;
			}
			this.neighbors = neighbors;
			if (neighbors === undefined) {
				this.neighbors = [];
			}
		}
		
		variation() {
			return this.position.sub(
				new Vector(
					utils.randomInt(-this.width / 2 + config.students.radius,
									 this.width / 2 - config.students.radius),
					utils.randomInt(-this.height / 2 + config.students.radius,
									 this.height / 2 - config.students.radius)
				)
			);
		}
	};
}());