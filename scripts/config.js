(function() {
	module.exports = {
		people: {
			targetThreshold: 3,
			draw: true,
			radius: 10,
			speed: 2,
			students: {
				useRandomColors: false,
				color: 'rgba(255, 0, 0, 1)',
			},
			teachers: {
				useRandomColors: false,
				color: 'rgba(0, 0, 255, 1)',
			}
		},
		waypoints: {
			draw: true,
			color: 'rgba(127, 127, 255, 1)',
			drawIds: true,
			idColor: 'rgba(0, 0, 0, 1)',
			rooms: {
				draw: true,
				color: 'rgba(127, 255, 127, 1)',
				drawIds: true,
				idColor: 'rgba(0, 0, 0, 1)',
				teleporters: {
					draw: true,
					color: 'rgba(255, 127, 127, 1)',
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
		},
		debug: {
			students: {
				amount: 29
			},
			teachers: {
				amount: 1
			}
		}
	};
}());