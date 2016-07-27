(function() {
	const utils = require('../utils.js');
	const config = require('../config.js');
	const Vector = require('../vector.js');
	const Waypoint = require('./waypoint.js');
	
	module.exports = class Room extends Waypoint {
		constructor(position, width, height, neighbors) {
			super(position, neighbors);
			this.width = width;
			if (width === undefined) {
				this.width = 0;
			}
			this.height = height;
			if (height === undefined) {
				this.height = 0;
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