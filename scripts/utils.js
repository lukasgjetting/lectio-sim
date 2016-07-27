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