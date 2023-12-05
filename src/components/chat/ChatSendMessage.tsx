import { useAuthContext } from "@/context/AuthContext";
import { useSocketContext } from "@/context/SocketContext";
import { useSocket } from "@/hooks/useSocket";
import React, { ChangeEvent, useState } from "react";

const ChatSendMessage = () => {
  const [newMessage, setNewMessage] = useState<string>("");

  const { customer } = useAuthContext();

  const { socketInstance } = useSocketContext();

  const sendMessage = () => {
    if (!newMessage.trim()) {
      return;
    }

    socketInstance.emit("newMessage", {
      content: newMessage,
      fromId: customer?.id,
      fromName: customer?.name,
    });

    setNewMessage("");
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="bottom-0 w-full h-1/5 flex justify-center gap-2 items-center  py-5 px-2 ">
      <textarea
        value={newMessage}
        onChange={handleChange}
        onKeyUpCapture={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        className="block p-2 w-4/5 text-sm flex-wrap text-gray-900 bg-white rounded-lg border-2 resize-none overflow-y-hidden focus:border-purple-primary outline-none border-gray-300"
        placeholder="Digite aqui..."
      ></textarea>

      <button
        type="submit"
        onClick={sendMessage}
        className="inline-flex justify-center p-5  bg-[#4DBEBB]
      text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
      >
        <svg
          className="w-5 h-5 rotate-90 rtl:-rotate-90 fill-white"
          aria-hidden="true"
          viewBox="0 0 18 20"
        >
          <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
        </svg>
        <span className="sr-only">Send messages</span>
      </button>
    </div>
  );
};

export default ChatSendMessage;
