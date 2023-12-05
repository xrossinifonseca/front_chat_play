"use client";
import React, { useEffect, useState } from "react";
import ChatScreen from "../chat/ChatScreen";
import UsersOnline from "../customers/UsersOnline";
import { useSocketContext } from "@/context/SocketContext";

const ChatRoom = () => {
  const [notification, setNotification] = useState<number>(0);
  const [show, setShow] = useState(false);
  const { socketInstance } = useSocketContext();

  useEffect(() => {
    socketInstance.on("notification", (e) => {
      setNotification((prev) => prev + 1);
    });
    return () => {
      socketInstance.off("notification");
    };
  }, [socketInstance]);
  useEffect(() => {
    document.title =
      notification > 0 ? `(${notification}) Chat play` : "Chat play";
  }, [notification]);

  return (
    <div
      className="max-w-[1500px] h-full  w-full grid place-items-center"
      onClick={() => setNotification(0)}
    >
      <div className="flex flex-col lg:flex-row items-end justify-center w-full gap-5">
        <div className="w-full lg:hidden">
          <button
            onClick={() => setShow((e) => !e)}
            className=" w-16 bg-purple-secundary rounded-full p-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier"></g>
              <g id="SVGRepo_tracerCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M4 6H20M4 12H14M4 18H9" stroke="#EFA985"></path>{" "}
              </g>
            </svg>
          </button>
        </div>

        <UsersOnline show={show} />

        <ChatScreen />
      </div>
    </div>
  );
};

export default ChatRoom;
