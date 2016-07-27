(function() {
	const Student = require('./people/student.js');
	const Teacher = require('./people/teacher.js');
	const Waypoint = require('./waypoints/waypoint.js');
	const Vector = require('./vector.js');
	const utils = require('./utils.js');
	const rooms = require('./layout.js').rooms;
	const config = require('./config.js');
	
	let people = [];
	let students = [];
	let teachers = [];
	
	initialize();
	
	for (var i = 0; i < people.length; i++) {
		if (people[i] instanceof Student) {
			students.push(people[i]);
		} else if (people[i] instanceof Teacher) {
			teachers.push(people[i]);
		}
	}
	
	module.exports = {
		people: people,
		students: students,
		teachers: teachers
	};
	
	// Todo: Load from scrape
	function initialize() {
		for (let i = 0; i < config.debug.students.amount; i++) {
			const origin = rooms[utils.randomInt(0, rooms.length - 1)];
			const destination = rooms[utils.randomInt(0, rooms.length - 1)];
			let color;
			if (config.people.students.useRandomColors) {
				color = utils.randomColor();
			} else {
				color = config.people.students.color;
			}
			const student = new Student(origin, destination, color);
			people.push(student);
		}
		for (let i = 0; i < config.debug.teachers.amount; i++) {
			const origin = rooms[utils.randomInt(0, rooms.length - 1)];
			const destination = rooms[utils.randomInt(0, rooms.length - 1)];
			let color;
			if (config.people.teachers.useRandomColors) {
				color = utils.randomColor();
			} else {
				color = config.people.teachers.color;
			}
			const teacher = new Teacher(origin, destination, color);
			people.push(teacher);
		}
	}
}());