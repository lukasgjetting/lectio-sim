(function() {
	const Student = require('./student.js');
	const Waypoint = require('./waypoint.js');
	const Vector = require('./vector.js');
	const utils = require('./utils.js');
	const waypoints = require('./layout.js').waypoints;
	const config = require('./config.js');
	
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