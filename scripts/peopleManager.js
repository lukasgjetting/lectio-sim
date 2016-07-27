(function() {
	const Student = require('./people/student.js');
	const Teacher = require('./people/teacher.js');
	const utils = require('./utils.js');
	const rooms = require('./layout.js').rooms;
	const config = require('./config.js');
	const json = require("json!./scraping/test.json");
	
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
	
	function initialize() {
		for (let i = 0; i < json.students.length; i++) {
			const schedule = json.students[i].schedule;
			let color;
			if (config.people.students.useRandomColors) {
				color = utils.randomColor();
			} else {
				color = config.people.students.color;
			}
			const student = new Student(schedule, color);
			people.push(student);
		}
	}
}());