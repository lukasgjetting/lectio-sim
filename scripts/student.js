class Student {
	constructor(initialWaypoint, target, speed, color) {
		this.position = this.getWaypointVariation(initialWaypoint);
		this.shouldMove = true;
		this.route = calculateRoute(initialWaypoint, target);
		this.routeIndex = 0;
		this.speed = speed;
		this.color = color;
		this.innerTarget = this.getWaypointVariation(this.route[this.routeIndex]);
	}
	
	getWaypointVariation(waypoint) {
		if (waypoint !== undefined) {
			return waypoint.position.Sub(
				new Vector(
					getRandomInt(-waypoint.width/2,
								  waypoint.width/2),
					getRandomInt(-waypoint.height/2,
								  waypoint.height/2)
					)
				);
		}
	}
	
	nextWaypoint() {
		if (this.routeIndex < this.route.length - 1) {
			this.routeIndex++;
			this.innerTarget = this.getWaypointVariation(this.route[this.routeIndex]);
		}
	}
	
	setNewWaypoint(waypoint) {
		this.shouldMove = true;
		this.route = calculateRoute(this.innerTarget, target);
	}
}