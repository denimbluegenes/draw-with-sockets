// Simple Express + Socket.io server for collaborative drawing

const express = require("express");
const app = express();

// Use Render's port OR 3000 locally
const PORT = process.env.PORT || 3000;

// Serve everything in the "public" folder
app.use(express.static("public"));

// Start the HTTP server
const server = app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

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
