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
			if (number === 0) {
				return new Vector();
			}
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