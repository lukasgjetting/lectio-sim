class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	Add(vector) {
		return new Vector(this.x + vector.x, this.y + vector.y);
	}
	
	Sub(vector) {
		return new Vector(this.x - vector.x, this.y - vector.y);
	}
	
	Divide(number) {
		return new Vector(this.x / number, this.y / number);
	}
	
	Multiply(number) {
		return new Vector(this.x * number, this.y * number);
	}
	
	Length() {
		return Math.sqrt(Math.abs(Math.pow(this.x, 2) + Math.pow(this.y, 2)));
	}
	
	Normalise() {
		return this.Divide(this.Length());
	}
}