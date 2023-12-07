import io from "socket.io-client";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const socket = () =>
  io(`${url}`, {
    autoConnect: false,
  });
