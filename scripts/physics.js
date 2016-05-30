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
	wireframes: false
};

// Render setup
const render = Render.create({
    element: document.body,
    engine: engine,
    options: options
});

// Test objects
const students = [];
for (var i = 0; i < 20; i++) {
	students.push(new Student(
		Bodies.circle(0, 0, 20, {
			frictionAir: 0
		}),
		Matter.Vector.create(500, 500)
	));
}

// Events
Events.on(render, "afterRender", updateVelocities);

// Run
Engine.run(engine);
Render.run(render);

function updateVelocities() {
	for (var i = 0; i < students.length; i++) {
		students[i].updateVelocity();
	}
}