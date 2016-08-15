const json = require('json!./scraping/test.json');
const people = require('./peopleManager.js').people;
const pathfinding = require('./pathfinding.js');

(function () {
	// In seconds
	let time = 30000;

	module.exports = {
		tick
	};

	function tick() {
		time += 10;
		for (let i = 0; i < people.length; i++) {
			if (people[i].schedule.length > 0) {
				if (time > people[i].schedule[0].end) {
					people[i].schedule.shift();
					people[i].nextRoute();
				}
			}
		}
	}
}());