const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

//Serve static files
app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("New WebSocket connection!");

  welcomeMsg = "Welcome to Chatty!";
  socket.emit("message", welcomeMsg);
  //Broadcat emits an event to all connections exept the current one!
  socket.broadcast.emit("message", "A new user has joined!");

  socket.on("sendMessage", message => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
});

//Start the server
server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}...`);
});
