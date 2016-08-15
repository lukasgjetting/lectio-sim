(function () {
	const waypoints = require('./layout.js').waypoints;
	const Teleporter = require('./waypoints/teleporter.js');

	module.exports = {
		calculateRoute
	};

	let routes = [];

	function calculateRoute(start, target) {
		routes = [];
		next(target, start, 0, [target]);
		if (routes.length > 0) {
			let bestRoute;
			for (let i = 0; i < routes.length; i++) {
				if (bestRoute === undefined || bestRoute.distance > routes[i].distance) {
					bestRoute = routes[i];
				}
			}
			return bestRoute.route.reverse();
		}
		return undefined;
	}

	function next(waypoint, target, distance, route) {
		for (let i = 0; i < waypoint.neighbors.length; i++) {
			const neighbor = waypoints[waypoint.neighbors[i]];
			const newDistance = distance + dist(waypoint, neighbor);
			const fork = route.slice(0);
			if (fork.indexOf(neighbor) === -1) {
				fork.push(neighbor);
				if (neighbor === target) {
					routes.push({ route, distance: newDistance });
					return;
				}
				next(neighbor, target, newDistance, fork);
			}
		}
	}

	function dist(waypoint1, waypoint2) {
		const isTeleporterPath = waypoint1 instanceof Teleporter &&
								 waypoint2 instanceof Teleporter;
		if (!isTeleporterPath) {
			const x1 = waypoint1.position.x;
			const x2 = waypoint2.position.x;
			const y1 = waypoint1.position.y;
			const y2 = waypoint2.position.y;
			return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
		}
		return 0;
	}
}());
