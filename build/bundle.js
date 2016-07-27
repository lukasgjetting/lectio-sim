/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const canvas = __webpack_require__(1);
		const students = __webpack_require__(3);
		
		canvas.animate();
	}());

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const renderer = __webpack_require__(2);
		const students = __webpack_require__(3);
		
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
	
		window.requestAnimFrame = (function() {
		    return window.requestAnimationFrame       ||
		    	   window.webkitRequestAnimationFrame ||
		    	   window.mozRequestAnimationFrame    ||
		    	   window.oRequestAnimationFrame      ||
		    	   window.msRequestAnimationFrame     ||
		    	   function(callback, element) {
		               window.setTimeout(callback, 1000 / 60);
		    	   };
		})();
		
		function animate() {
		    requestAnimFrame(animate);
		    renderer.render(ctx);
		    for (var i = 0; i < students.length; i++) {
		    	students[i].move();
		    }
		}
		
		module.exports = {
			animate: animate
		};
	
	}());

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const students = __webpack_require__(3);
		const layout = __webpack_require__(8);
		const config = __webpack_require__(6);
		const Waypoint = __webpack_require__(9);
		const Room = __webpack_require__(11);
		const Teleporter = __webpack_require__(12);
	
		module.exports = {
			render: render
		};
			
		function render(ctx) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			if (config.paths.draw) {
				drawPaths(ctx);
			}
			if (config.waypoints.draw) {
				drawWaypoints(ctx);
			}
			if (config.students.draw) {
				drawStudents(ctx);
			}
		}
	
		function drawStudents(ctx) {
			for (var i = 0; i < students.length; i++) {
				ctx.beginPath();
				ctx.arc(students[i].position.x, students[i].position.y, config.students.radius, 0, Math.PI * 2);
				ctx.fillStyle = students[i].color;
				ctx.fill();
			}
		}
		
		function drawWaypoints(ctx) {
			for (var i = 0; i < layout.waypoints.length; i++) {
				if (layout.waypoints[i] instanceof Teleporter) {
					drawTeleporter(ctx, layout.waypoints[i]);
				} else if (layout.waypoints[i] instanceof Room) {
					drawRoom(ctx, layout.waypoints[i]);
				} else {
					drawWaypoint(ctx, layout.waypoints[i]);
				}
			}
		}
		
		function drawWaypoint(ctx, waypoint) {
			ctx.beginPath();
			ctx.arc(waypoint.position.x, waypoint.position.y, config.waypoints.radius, 0, Math.PI * 2);
			ctx.fillStyle = config.waypoints.color;
			ctx.fill();
			if (config.waypoints.drawIds) {
				ctx.fillStyle = config.waypoints.idColor;
				ctx.fillText(layout.waypoints.indexOf(waypoint), waypoint.position.x, waypoint.position.y);
			}
		}
		
		function drawRoom(ctx, room) {
			ctx.beginPath();
			ctx.rect(
				room.position.x - room.width/2,
				room.position.y - room.height/2,
				room.width,
				room.height
			);
			ctx.fillStyle = config.waypoints.rooms.color;
			ctx.fill();
			if (config.waypoints.rooms.drawIds) {
				ctx.fillStyle = config.waypoints.rooms.idColor;
				ctx.fillText(layout.waypoints.indexOf(room), room.position.x, room.position.y);
			}
			
		}
		
		function drawTeleporter(ctx, teleporter) {
			ctx.beginPath();
			ctx.rect(
				teleporter.position.x - teleporter.width/2,
				teleporter.position.y - teleporter.height/2,
				teleporter.width,
				teleporter.height
			);
			ctx.fillStyle = config.waypoints.rooms.teleporters.color;
			ctx.fill();
			if (config.waypoints.drawIds) {
				ctx.fillStyle = config.waypoints.rooms.teleporters.idColor;
				ctx.fillText(layout.waypoints.indexOf(teleporter), teleporter.position.x, teleporter.position.y);
			}
		}
		
		function drawPaths(ctx) {
			let lines = [];
			for (let i = 0; i < layout.waypoints.length; i++) {
				for (let j = 0; j < layout.waypoints[i].neighbors.length; j++) {
					const waypoint1 = layout.waypoints[i];
					const waypoint2 = layout.waypoints[layout.waypoints[i].neighbors[j]];
					const isTeleporterPath = waypoint1 instanceof Teleporter &&
											 waypoint2 instanceof Teleporter;
					let line = {
						point1: waypoint1.position,
						point2: waypoint2.position
					};
					if (lines.indexOf(line) === -1) {
						lines.push(line);
						ctx.beginPath();
						ctx.moveTo(line.point1.x, line.point1.y);
						ctx.lineTo(line.point2.x, line.point2.y);
						ctx.lineWidth = config.paths.width;
						if (isTeleporterPath) {
							ctx.strokeStyle = config.paths.teleportPathColor;
						} else {
							ctx.strokeStyle = config.paths.color;
						}
						if (!isTeleporterPath || config.paths.drawTeleportPaths) {
							ctx.stroke();
						}
					}
				}
			}
		}
	}());

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const Student = __webpack_require__(4);
		const Waypoint = __webpack_require__(9);
		const Vector = __webpack_require__(5);
		const utils = __webpack_require__(10);
		const rooms = __webpack_require__(8).rooms;
		const config = __webpack_require__(6);
		
		let students = [];
		initialize();
		
		module.exports = students;
		
		// Todo: Load from scrape
		function initialize() {
			students = [];
			for (let i = 0; i < config.students.debug.amount; i++) {
				const origin = rooms[utils.randomInt(0, rooms.length - 1)];
				const destination = rooms[utils.randomInt(0, rooms.length - 1)];
				let color;
				if (config.students.useRandomColors) {
					color = utils.randomColor();
				} else {
					color = config.students.color;
				}
				const student = new Student(origin, destination, color);
				students.push(student);
			}
		}
	}());

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const Vector = __webpack_require__(5);
		const config = __webpack_require__(6);
		const pathfinding = __webpack_require__(7);
		const Teleporter = __webpack_require__(12);
		
		module.exports = class Student {
			constructor(origin, destination, color) {
				this.position = origin.variation();
				if (this.position === undefined) {
					position = new Vector();
				}
				this.color = color;
				if (this.color === undefined) {
					color = 'rgba(0, 0, 0, 1)';
				}
				this.shouldMove = true;
				this.speed = config.students.speed;
				
				this.route = pathfinding.calculateRoute(origin, destination);
				if (this.route !== undefined && this.route.length > 0) {
					this.targetPosition = this.route[0].variation();
				}
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
				const left = this.targetPosition.x - config.students.targetThreshold;
				const right = this.targetPosition.x + config.students.targetThreshold;
				const upper = this.targetPosition.y - config.students.targetThreshold;
				const lower = this.targetPosition.y + config.students.targetThreshold;
				return (this.position.x > left &&
						this.position.x < right &&
						this.position.y > upper &&
						this.position.y < lower);
			}
		};
	}());


/***/ },
/* 5 */
/***/ function(module, exports) {

	(function() {
		module.exports = class Vector {
			constructor(x, y) {
				this.x = x;
				if (x === undefined) {
					this.x = 0;
				}
				this.y = y;
				if (y === undefined) {
					this.y = 0;
				}
			}
			
			add(vector) {
				return new Vector(this.x + vector.x, this.y + vector.y);
			}
			
			sub(vector) {
				return new Vector(this.x - vector.x, this.y - vector.y);
			}
			
			divide(number) {
				return new Vector(this.x / number, this.y / number);
			}
			
			multiply(number) {
				return new Vector(this.x * number, this.y * number);
			}
			
			length() {
				return Math.sqrt(Math.abs(Math.pow(this.x, 2) + Math.pow(this.y, 2)));
			}
			
			lengthNotSquared() {
				return Math.abs(Math.pow(this.x, 2) + Math.pow(this.y, 2));
			}
			
			normalize() {
				return this.divide(this.length());
			}
		};
	}());

/***/ },
/* 6 */
/***/ function(module, exports) {

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const waypoints = __webpack_require__(8).waypoints;
		const Teleporter = __webpack_require__(12);
		
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
			const isTeleporterPath = waypoint1 instanceof Teleporter &&
									 waypoint2 instanceof Teleporter;
			if (!isTeleporterPath) {
				x1 = waypoint1.position.x;
				x2 = waypoint2.position.x;
				y1 = waypoint1.position.y;
				y2 = waypoint2.position.y;
				return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
			} else {
				return 0;
			}
		}
	}());

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const Vector = __webpack_require__(5);
		const Waypoint = __webpack_require__(9);
		const Room = __webpack_require__(11);
		const Teleporter = __webpack_require__(12);
	
		const waypoints = [
			new Teleporter(new Vector(90, 300), 30, 30, [1,11]),
			new Room(new Vector(175, 300), 30, 30, [0,2,3]),
			new Room(new Vector(175, 425), 30, 30, [1,9]),
			new Room(new Vector(175, 175), 30, 30, [1,4]),
			new Room(new Vector(290, 175), 30, 30, [3,5]),
			new Room(new Vector(290, 55),  30, 30, [4,6]),
			new Room(new Vector(350, 55),  30, 30, [5,7]),
			new Room(new Vector(350, 175), 30, 30, [6,8]),
			new Room(new Vector(500, 175), 30, 30, [7,10]),
			new Room(new Vector(500, 425), 30, 30, [10,2]),
			new Room(new Vector(500, 300), 30, 30, [8,9,13]),
			new Teleporter(new Vector(600, 200), 30, 30, [0,12,13]),
			new Room(new Vector(600, 075), 30, 30, [11,13]),
			new Room(new Vector(600, 300), 30, 30, [11,15,10]),
			new Room(new Vector(750, 075), 30, 30, [12,15]),
			new Room(new Vector(750, 300), 30, 30, [13,13]),
		];
		
		let rooms = [];
		let teleporters = [];
		
		// Sort waypoints into sub-lists.
		for (var i = 0; i < waypoints.length; i++) {
			if (waypoints[i] instanceof Teleporter) {
				teleporters.push(waypoints[i]);
			} else if (waypoints[i] instanceof Room) {
				rooms.push(waypoints[i]);
			}
		}
		
		module.exports = {
			waypoints: waypoints,
			rooms: rooms,
			teleporters: teleporters,
		};
	}());

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const Vector = __webpack_require__(5);
		const utils = __webpack_require__(10);
		const config = __webpack_require__(6);
		
		module.exports = class Waypoint {
			constructor(position, neighbors) {
				this.position = position;
				if (position === undefined) {
					this.position = new Vector();
				}
				this.neighbors = neighbors;
				if (neighbors === undefined) {
					this.neighbors = [];
				}
			}
		};
	}());

/***/ },
/* 10 */
/***/ function(module, exports) {

	(function() {
		module.exports = {
			randomInt: randomInt,
			randomDouble: randomDouble,
			randomColor: randomColor
		};
			
		function randomInt(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
		function randomDouble(min, max) {
		    return Math.random() * (max - min + 1) + min;
		}
		
		function randomColor() {
		    return 'rgba(' + randomInt(0, 255) + ', ' + randomInt(0, 255) + ', ' + randomInt(0, 255) + ', 1)';
		}
	}());

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const utils = __webpack_require__(10);
		const config = __webpack_require__(6);
		const Vector = __webpack_require__(5);
		const Waypoint = __webpack_require__(9);
		
		module.exports = class Room extends Waypoint {
			constructor(position, width, height, neighbors) {
				super(position, neighbors);
				this.width = width;
				if (width === undefined) {
					this.width = 0;
				}
				this.height = height;
				if (height === undefined) {
					this.height = 0;
				}
			}
			
			variation() {
				return this.position.sub(
					new Vector(
						utils.randomInt(-this.width / 2 + config.students.radius,
										 this.width / 2 - config.students.radius),
						utils.randomInt(-this.height / 2 + config.students.radius,
										 this.height / 2 - config.students.radius)
					)
				);
			}
		};
	}());

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const Room = __webpack_require__(11);
		
		// Will teleport a person to the first teleporter in this waypoint's list of neighbors.
		// The teleporter can be set to preserve the persons x and/or y coordinates relative to
		// the teleporter when teleporting. This is useful if you for exmaple want to have two
		// wide teleporters and don't want to the person jumping from one side to the other when
		// they teleport.
		module.exports = class Teleporter extends Room {
			constructor(position, width, height, neighbors, preserveX, preserveY) {
				super(position, width, height, neighbors);
				this.preserveX = preserveX;
				this.preserveY = preserveY;
			}
		};
	}());

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map