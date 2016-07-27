(function() {
	module.exports = {
		students: {
			draw: true,
			radius: 10,
			useRandomColors: true,
			speed: 3,
			color: 'rgba(255, 0, 0, 1)',
			targetThreshold: 3,
			debug: {
				amount: 1
			}
		},
		waypoints: {
			draw: true,
			color: 'rgba(127, 255, 127, 1)',
			drawIds: true,
			idColor: 'rgba(0, 0, 0, 1)',
			rooms: {
				draw: true,
				color: 'rgba(127, 255, 127, 1)',
				drawIds: true,
				idColor: 'rgba(0, 0, 0, 1)',
				teleporters: {
					draw: true,
					color: 'rgba(127, 255, 127, 1)',
					drawIds: true,
					idColor: 'rgba(0, 0, 0, 1)',
				}
			},
		},
		paths: {
			draw: true,
			width: 2,
			color: 'rgba(0, 0, 0, 1)',
			drawTeleportPaths: true,
			teleportPathColor: 'rgba(255, 0, 0, 0.2)',
		}
	};
}());