(function() {
	const Vector = require('./vector.js');
	const config = require('./config.js');
	const pathfinding = require('./pathfinding.js');
	
	module.exports = class Student {
		constructor(waypoint, destination, color) {
			this.position = waypoint.variation();
			if (this.position === undefined) {
				position = new Vector();
			}
			this.color = color;
			if (this.color === undefined) {
				color = 'rgba(0, 0, 0, 1)';
			}
			this.shouldMove = true;
			this.speed = config.students.speed;
			
			this.route = pathfinding.calculateRoute(waypoint, destination);
			if (this.route !== undefined && this.route.length > 0) {
				this.targetPosition = this.route[0].variation();
			}
		}
		
		move() {
			if (this.shouldMove && this.targetPosition !== undefined) {
				const direction = this.targetPosition.sub(this.position);
				const normalized = direction.normalize();
				this.position = this.position.add(normalized.multiply(this.speed));
				if (this.isAtTarget()) {
					this.route.shift();
					if (this.route.length === 0) {
						this.shouldMove = false;
					} else {
						this.targetPosition = this.route[0].variation();
					}
				}
			}
		}
		
		isAtTarget() {
			const left = this.targetPosition.x - config.students.targetThreshold;
			const right = this.targetPosition.x + config.students.targetThreshold;
			const upper = this.targetPosition.y - config.students.targetThreshold;
			const lower = this.targetPosition.y + config.students.targetThreshold;
			return (this.position.x > left &&
					this.position.x < right &&
					this.position.y > upper &&
					this.position.y < lower);
		}
	};
}());
