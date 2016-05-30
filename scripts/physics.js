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
    height: 600,
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
//setInterval(updateVelocities, 100);
setInterval(spawnDots, 100);

function updateVelocities() {
	for (var i = 0; i < students.length; i++) {
		students[i].updateVelocity();
	}
}

function spawnDots() {
	if (students.length < 200) {
		for (var i = 0; i < 10; i++) {
			students.push(new Student(
				Bodies.circle(getRandomInt(0, 800), getRandomInt(0, 600), 10, {
					frictionAir: 0
				}),
				Matter.Vector.create(getRandomInt(0, 800), getRandomInt(0, 600))
			));
		}
	}
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}