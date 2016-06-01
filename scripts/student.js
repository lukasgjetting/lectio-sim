class Student {
	constructor(position, waypointIndex, speed, color) {
		this.position = position;
		this.waypointIndex = waypointIndex;
		this.shouldMove = true;
		this.setWaypoint(waypointIndex);
		this.speed = speed;
		this.color = color;
	}
	
	setWaypoint(waypointIndex) {
		this.waypoint =
			waypoints[waypointIndex].position.Sub(
				new Vector(
					getRandomInt(-waypoints[waypointIndex].width/2,
								  waypoints[waypointIndex].width/2),
					getRandomInt(-waypoints[waypointIndex].height/2,
								  waypoints[waypointIndex].height/2))
				);
	}
}