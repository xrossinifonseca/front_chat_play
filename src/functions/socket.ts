import io from "socket.io-client";

const url = process.env.NEXT_PUBLIC_BACKEND_URL

console.log("Backend URL:", url);


export const socket = () =>
  io('https://api-chat-play.onrender.com/', {
    autoConnect: false,
  });
