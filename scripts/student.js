class Student {
	constructor(initialWaypoint, target, speed, color) {
		this.position = this.getWaypointVariation(initialWaypoint);
		this.shouldMove = true;
		this.route = this.calculateRoute(initialWaypoint, target);
		this.routeIndex = 0;
		this.speed = speed;
		this.color = color;
		this.innerTarget = this.getWaypointVariation(this.route[this.routeIndex]);
	}
	
	getWaypointVariation(waypoint) {
		return waypoint.position.Sub(
			new Vector(
				getRandomInt(-waypoint.width/2,
							  waypoint.width/2),
				getRandomInt(-waypoint.height/2,
							  waypoint.height/2)
				)
			);
	}
	
	nextWaypoint() {
		if (this.routeIndex < this.route.length - 1) {
			this.routeIndex++;
			this.innerTarget = this.getWaypointVariation(this.route[this.routeIndex]);
		}
	}
	
	calculateRoute(start, target) {
		return [
			waypoints[0],
			waypoints[1],
			waypoints[3],
			waypoints[4],
			waypoints[5],
			waypoints[6],
			waypoints[7],
			waypoints[8],
			waypoints[10],
			waypoints[9],
			waypoints[2],
			waypoints[1],
			waypoints[0],
		];
	}
}