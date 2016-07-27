(function() {
	const Student = require('./student.js');
	const Waypoint = require('./map/waypoint.js');
	const Vector = require('./vector.js');
	const utils = require('./utils.js');
	const rooms = require('./layout.js').rooms;
	const config = require('./config.js');
	
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