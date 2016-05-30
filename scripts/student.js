class Student {
	constructor(body, waypoint) {
		this._body = body;
		if (waypoint) {
			this._waypoint = waypoint;
		}
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
		if (this._waypoint) {
			const velocity = Matter.Vector.sub(this._waypoint, this._body.position);
			const normalised = Matter.Vector.normalise(velocity);
			Matter.Body.setVelocity(this._body, Matter.Vector.mult(normalised, 2));
		}
	}
}