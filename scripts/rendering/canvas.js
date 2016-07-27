(function() {
	const renderer = require('./renderer.js');
	const students = require('../students.js');
	
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