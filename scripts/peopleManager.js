(function () {
	const Student = require('./people/student.js');
	const Teacher = require('./people/teacher.js');
	const utils = require('./utils.js');
	const config = require('./config.js');
	const json = require('json!./scraping/test.json');

	const people = [];
	const students = [];
	const teachers = [];

	initialize();

	for (let i = 0; i < people.length; i++) {
		if (people[i] instanceof Student) {
			students.push(people[i]);
		} else if (people[i] instanceof Teacher) {
			teachers.push(people[i]);
		}
	}

	module.exports = {
		people,
		students,
		teachers
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
