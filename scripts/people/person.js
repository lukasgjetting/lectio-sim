(function () {
	const Vector = require('../vector.js');
	const config = require('../config.js');
	const pathfinding = require('../pathfinding.js');
	const Room = require('../waypoints/room.js');
	const Teleporter = require('../waypoints/teleporter.js');
	const waypoints = require('../layout.js').waypoints;

	module.exports = class Person {
		constructor(schedule, color) {
			this.schedule = schedule;
			if (waypoints[schedule[0].room.id] instanceof Room) {
				this.position = waypoints[schedule[0].room.id].variation();
			} else {
				this.position = waypoints[schedule[0].room.id].position;
			}
			if (this.position === undefined) {
				this.position = new Vector();
			}
			this.color = color;
			if (this.color === undefined) {
				this.color = 'rgba(0, 0, 0, 1)';
			}
			this.shouldMove = true;
			this.speed = config.people.speed;

			this.nextRoute();
		}

		move() {
			if (this.shouldMove && this.targetPosition !== undefined) {
				const direction = this.targetPosition.sub(this.position);
				const normalized = direction.normalize();
				this.position = this.position.add(normalized.multiply(this.speed));
				if (this.isAtTarget()) {
					const shouldTeleport = this.route.length > 0 &&
										   this.route[0] instanceof Teleporter &&
										   this.route[1] instanceof Teleporter;
					this.route.shift();
					if (this.route.length === 0) {
						this.shouldMove = false;
					} else {
						this.targetPosition = this.route[0].variation();
						if (shouldTeleport) {
							this.position = this.targetPosition;
						}
					}
				}
			}
		}

		isAtTarget() {
			const left = this.targetPosition.x - config.people.targetThreshold;
			const right = this.targetPosition.x + config.people.targetThreshold;
			const upper = this.targetPosition.y - config.people.targetThreshold;
			const lower = this.targetPosition.y + config.people.targetThreshold;
			return (this.position.x > left &&
					this.position.x < right &&
					this.position.y > upper &&
					this.position.y < lower);
		}

		nextRoute() {
			if (this.schedule.length > 1) {
				const origin = waypoints[this.schedule[0].room.id];
				const destination = waypoints[this.schedule[1].room.id];
				this.route = pathfinding.calculateRoute(origin, destination);
				if (this.route !== undefined && this.route.length > 0) {
					this.targetPosition = this.route[0].variation();
					this.shouldMove = true;
				}
			}
		}
	};
}());
