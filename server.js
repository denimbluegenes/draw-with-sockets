// Simple Express + Socket.io server for collaborative drawing

const express = require("express");
const app = express();

// Create HTTP server
const server = app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// Serve everything in the "public" folder
app.use(express.static("public"));

// Attach socket.io to the server
const socket = require("socket.io");
const io = socket(server);

// Handle incoming socket connections
io.sockets.on("connection", (socket) => {
  console.log("New connection: " + socket.id);

  // Receive drawing data from one client
  socket.on("mouse", (data) => {
    // Send it to all *other* clients
    socket.broadcast.emit("mouse", data);
  });
});
