(function() {
	const waypoints = require('./layout.js').waypoints;
	
	module.exports = {
		calculateRoute: calculateRoute
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
		} else {
			return [];
		}
	}
	
	function next(waypoint, target, distance, route) {
		for (let i = 0; i < waypoint.neighbors.length; i++) {
			const neighbor = waypoints[waypoint.neighbors[i]];
			const newDistance = distance + dist(waypoint, neighbor);
			let fork = route.slice(0);
			if (fork.indexOf(neighbor) == -1) {
				fork.push(neighbor);
				if (neighbor == target) {
					routes.push({ route: route, distance: newDistance });
					return;
				} else {
					next(neighbor, target, newDistance, fork);
				}
			}
		}
	}
	
	function dist(waypoint1, waypoint2) {
		x1 = waypoint1.position.x;
		x2 = waypoint2.position.x;
		y1 = waypoint1.position.y;
		y2 = waypoint2.position.y;
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}
}());