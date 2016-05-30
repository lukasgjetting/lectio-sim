// Module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;

// Engine setup
const engine = Engine.create({
	enableSleeping: true
});
engine.world.gravity.y = 0;

// Option setup
const options = {
	background: '#ffffff',
	wireframeBackground: '#ffffff',
	wireframes: false,
	width: 800,
	height: 600
};

// Render setup
const render = Render.create({
	element: document.body,
	engine: engine,
	options: options
});

// Test objects
const students = [];

// Events
Events.on(render, "afterRender", updateVelocities);

// Run
Engine.run(engine);
Render.run(render);

const WALLS = 0x0002;
//const WAYPOINTS = 0x0004;
const STUDENTS1 = 0x0004;
const STUDENTS2 = 0x0008;
const STUDENTS3 = 0x0010;

const waypoints = [
	{ position: Matter.Vector.create(300, 450), width: 50, height: 200 },
	{ position: Matter.Vector.create(350, 450), width: 50, height: 100 },
	{ position: Matter.Vector.create(400, 450), width: 50, height: 200 },
	{ position: Matter.Vector.create(800, 600), radius: Math.pow(100, 2) },
	{ position: Matter.Vector.create(800, 0), radius: Math.pow(100, 2) },
	{ position: Matter.Vector.create(400, 450), width: 50, height: 200 },
	{ position: Matter.Vector.create(350, 450), width: 50, height: 100 },
	{ position: Matter.Vector.create(300, 450), width: 50, height: 200 },
	{ position: Matter.Vector.create(0, 0), radius: Math.pow(100, 2) },
];

World.add(engine.world, Bodies.rectangle(350, 0, 50, 800, {
	isStatic: true,
	collisionFilter: {
		category: WALLS
	},
	isSleeping: true
}));

World.add(engine.world, Bodies.rectangle(350, 600, 50, 200, {
	isStatic: true,
	collisionFilter: {
		category: WALLS
	},
	isSleeping: true
}));

for (var i = 0; i < waypoints.length; i++) {
	if (waypoints[i].radius !== undefined) {
		World.add(engine.world, Bodies.circle(waypoints[i].position.x, waypoints[i].position.y, Math.sqrt(waypoints[i].radius), {
			isStatic: true,
			collisionFilter: {
				//category: WAYPOINTS
			},
			isSleeping: true
		}));
	}
	if (waypoints[i].width !== undefined && waypoints[i].height !== undefined) {
		World.add(engine.world, Bodies.rectangle(waypoints[i].position.x, waypoints[i].position.y, waypoints[i].width, waypoints[i].height, {
			isStatic: true,
			collisionFilter: {
				//category: WAYPOINTS
			},
			isSleeping: true
		}));
	}
}

for (var i = 0; i < 20; i++) {
	students.push(new Student(Bodies.circle(getRandomInt(-20, 20), getRandomInt(-20, 20), 10, {
		frictionAir: 0.08,
		collisionFilter: {
			category: STUDENTS1,
			mask: WALLS | STUDENTS3 | STUDENTS2 | STUDENTS1
		}
	}), 0));
}
for (var i = 0; i < 20; i++) {
	students.push(new Student(Bodies.circle(getRandomInt(780, 820), getRandomInt(580, 620), 10, {
		frictionAir: 0.08,
		collisionFilter: {
			category: STUDENTS2,
			mask: WALLS | STUDENTS3 | STUDENTS2 | STUDENTS1
		}
	}), 3));
}
for (var i = 0; i < 20; i++) {
	students.push(new Student(Bodies.circle(getRandomInt(780, 820), getRandomInt(-20, 20), 10, {
		frictionAir: 0.08,
		collisionFilter: {
			category: STUDENTS3,
			mask: WALLS | STUDENTS3 | STUDENTS2 | STUDENTS1
		}
	}), 4));
}

function updateVelocities() {
	for (var i = 0; i < students.length; i++) {
		students[i].updateVelocity();
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}