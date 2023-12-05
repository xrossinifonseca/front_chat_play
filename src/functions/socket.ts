import io from "socket.io-client";




export const socket = () =>
  io('https://api-chat-play.onrender.com/', {
    autoConnect: false,
  });
