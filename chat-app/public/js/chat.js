const socket = io();
socket.on("message", message => {
  console.log(`Message: ${message}`);
});

document.querySelector("#message-from").addEventListener("submit", e => {
  //prevent page reload from form submit
  e.preventDefault();
  let newMessage = e.target.elements.message.value;
  socket.emit("sendMessage", newMessage);
});
