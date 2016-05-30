class Student {
	constructor(body, waypoint) {
		this._body = body;
		this._waypoint = waypoint;
		this._shouldMove = true;
		World.add(engine.world, this._body);
	}
	
	get waypoint() {
		return this._waypoint;
	}

	set waypoint(position) {
		if (position) {
			this._waypoint = position;
			this.updateVelocity();
		}
	}
	
	updateVelocity() {
		if (this._shouldMove) {
			if (waypoints[this._waypoint].radius !== null) {
				if ((waypoints[this._waypoint].position.x - this._body.position.x) *
					(waypoints[this._waypoint].position.x - this._body.position.x) +
					(waypoints[this._waypoint].position.y - this._body.position.y) *
					(waypoints[this._waypoint].position.y - this._body.position.y) <
					waypoints[this._waypoint].radius) {
					this._waypoint = (this._waypoint + 1) % waypoints.length;
				}
			}
			if (waypoints[this._waypoint].width !== null && waypoints[this._waypoint].height !== null) {
				if (waypoints[this._waypoint].position.x - waypoints[this._waypoint].width/2 < this._body.position.x &&
					waypoints[this._waypoint].position.y - waypoints[this._waypoint].height/2 < this._body.position.y &&
					waypoints[this._waypoint].position.x + waypoints[this._waypoint].width/2 > this._body.position.x &&
					waypoints[this._waypoint].position.y + waypoints[this._waypoint].height/2 > this._body.position.y) {
					this._waypoint = (this._waypoint + 1) % waypoints.length;
				}
			}
			const velocity = Matter.Vector.sub(waypoints[this._waypoint].position, this._body.position);
			const normalised = Matter.Vector.normalise(velocity);
			Matter.Body.setVelocity(this._body, Matter.Vector.mult(normalised, 3));
		}
	}
}