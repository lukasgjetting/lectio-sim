(function() {
	const renderer = require('./renderer.js');
	const people = require('../peopleManager.js').people;
	const scheduler = require('../scheduler.js');
	
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
	    scheduler.tick();
	    renderer.render(ctx);
	    for (var i = 0; i < people.length; i++) {
	    	people[i].move();
	    }
	}
	
	module.exports = {
		animate: animate
	};

}());