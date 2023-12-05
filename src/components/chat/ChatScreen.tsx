"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Message from "./Message";
import ChatSendMessage from "./ChatSendMessage";
import { useSocket } from "@/hooks/useSocket";
import { useSocketContext } from "@/context/SocketContext";

interface Messages {
  content: string;
  fromId: number;
  fromName: string;
  date: Date;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Messages[]>([]);

  const { socketInstance } = useSocketContext();

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketInstance.on("newMessage", (message) => {
      setMessages([
        ...messages,
        {
          content: message.content,
          fromId: message.fromId,
          fromName: message.fromName,
          date: message.date,
        },
      ]);
    });

    return () => {
      socketInstance.off("newMessage");
    };
  }, [socketInstance, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollTo(0, lastMessageRef.current.scrollHeight);
  }, [messages]);

  const clearChatMessages = () => {
    setMessages([]);
  };

  return (
    <div className="w-full space-y-5 lg:w-3/5">
      <div className="flex justify-end">
        <button
          onClick={clearChatMessages}
          className=" border rounded-full h-14 px-2 border-purple-secundary text-gray-100 transtion-color ease-out duration-500 hover:bg-purple-secundary"
        >
          Limpar conversa
        </button>
      </div>

      <div className="bg-purple-secundary rounded-2xl relative w-full  h-[500px] ">
        <div ref={lastMessageRef} className=" overflow-y-auto  h-4/5  w-full">
          <div className="p-5 w-full  ">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </div>
        </div>

        <ChatSendMessage />
      </div>
    </div>
  );
};

export default ChatScreen;
