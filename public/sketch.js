// Collaborative drawing client using p5.js + socket.io

let socket;

function setup() {
  createCanvas(600, 400);
  background(255);

  // Connect to our server
  socket = io.connect("http://localhost:3000");

  // Listen for drawing events from other clients
  socket.on("mouse", newDrawing);
}

function newDrawing(data) {
  noStroke();
  fill(0);
  ellipse(data.x, data.y, 10, 10);
}

// Send our mouse position while dragging
function mouseDragged() {
  const data = {
    x: mouseX,
    y: mouseY
  };

  // Send to server
  socket.emit("mouse", data);

  // Draw locally
  noStroke();
  fill(0);
  ellipse(mouseX, mouseY, 10, 10);
}

function draw() {
  // nothing needed here
}
