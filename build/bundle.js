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
				if (layout.waypoints[i]) {
					ctx.beginPath();
					ctx.rect(
						layout.waypoints[i].position.x - layout.waypoints[i].width/2,
						layout.waypoints[i].position.y - layout.waypoints[i].height/2,
						layout.waypoints[i].width,
						layout.waypoints[i].height
					);
					ctx.fillStyle = config.waypoints.color;
					ctx.fill();
					if (config.waypoints.drawNumbers) {
						ctx.fillStyle = '#000000';
						ctx.fillText(i, layout.waypoints[i].position.x, layout.waypoints[i].position.y);
					}
				}
			}
		}
		
		function drawPaths(ctx) {
			let lines = [];
			for (let i = 0; i < layout.waypoints.length; i++) {
				for (let j = 0; j < layout.waypoints[i].neighbors.length; j++) {
					let line = {
						point1: layout.waypoints[i].position,
						point2: layout.waypoints[layout.waypoints[i].neighbors[j]].position
					};
					if (lines.indexOf(line) == -1) {
						lines.push(line);
						ctx.beginPath();
						ctx.moveTo(line.point1.x, line.point1.y);
						ctx.lineTo(line.point2.x, line.point2.y);
						ctx.lineWidth = config.paths.width;
						ctx.strokeStyle = config.paths.color;
						ctx.stroke();
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
		const waypoints = __webpack_require__(8).waypoints;
		const config = __webpack_require__(6);
		
		let students = [];
		initialize();
		
		module.exports = students;
		
		// Todo: Load from scrape
		function initialize() {
			students = [];
			for (let i = 0; i < 100; i++) {
				const waypoint = waypoints[utils.randomInt(0, waypoints.length - 1)];
				const destination = waypoints[utils.randomInt(0, waypoints.length - 1)];
				let color;
				if (config.students.useRandomColors) {
					color = utils.randomColor();
				} else {
					color = config.students.color;
				}
				const student = new Student(waypoint, destination, color);
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
		
		module.exports = class Student {
			constructor(waypoint, destination, color) {
				this.position = waypoint.variation();
				if (this.position === undefined) {
					position = new Vector();
				}
				this.color = color;
				if (this.color === undefined) {
					color = 'rgba(0, 0, 0, 1)';
				}
				this.shouldMove = true;
				this.speed = config.students.speed;
				
				this.route = pathfinding.calculateRoute(waypoint, destination);
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
						this.route.shift();
						if (this.route.length === 0) {
							this.shouldMove = false;
						} else {
							this.targetPosition = this.route[0].variation();
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
				speed: 2,
				color: 'rgba(255, 0, 0, 1)',
				targetThreshold: 3
			},
			waypoints: {
				draw: true,
				drawNumbers: false,
				color: 'rgba(127, 255, 127, 1)',
			},
			paths: {
				draw: true,
				width: 2,
				color: 'rgba(0, 0, 0, 1)',
			}
		};
	}());

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const waypoints = __webpack_require__(8).waypoints;
		
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		const Vector = __webpack_require__(5);
		const Waypoint = __webpack_require__(9);
	
		const waypoints = [
			new Waypoint(new Vector(90, 300),  30, 30, [1]),
			new Waypoint(new Vector(175, 300), 30, 30, [0,2,3]),
			new Waypoint(new Vector(175, 425), 30, 30, [1,9]),
			new Waypoint(new Vector(175, 175), 30, 30, [1,4]),
			new Waypoint(new Vector(290, 175), 30, 30, [3,5]),
			new Waypoint(new Vector(290, 55),  30, 30, [4,6]),
			new Waypoint(new Vector(350, 55),  30, 30, [5,7]),
			new Waypoint(new Vector(350, 175), 30, 30, [6,8]),
			new Waypoint(new Vector(500, 175), 30, 30, [7,10]),
			new Waypoint(new Vector(500, 425), 30, 30, [10,2]),
			new Waypoint(new Vector(500, 300), 30, 30, [8,9])
		];
		
		module.exports = {
			waypoints: waypoints
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
			constructor(position, width, height, neighbors) {
				this.position = position;
				if (position === undefined) {
					this.position = new Vector();
				}
				this.width = width;
				if (width === undefined) {
					this.width = 0;
				}
				this.height = height;
				if (height === undefined) {
					this.height = 0;
				}
				this.neighbors = neighbors;
				if (neighbors === undefined) {
					this.neighbors = [];
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map