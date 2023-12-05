import { useAuthContext } from "@/context/AuthContext";
import { capitalizeString } from "@/functions/capitalizeString";
import { getMessageTime } from "@/functions/formatDate";
import React, { ReactNode } from "react";

interface MessageProps {
  content: string;
  fromId: number;
  fromName: string;
  date: Date;
}

const Message = ({ message }: { message: MessageProps }) => {
  const { content, fromId, fromName, date } = message;

  const { customer } = useAuthContext();

  const fromSelf = fromId === customer?.id;
  const name = fromName === customer?.name ? "Você" : fromName;

  return (
    <div
      className={`w-full h-auto p-2 flex flex-col ${
        fromSelf ? "items-end" : "items-start"
      }`}
    >
      <span className="text-sm text-gray-200 px-2">
        {capitalizeString(name)}
      </span>
      <div
        className={`text-start flex-wrap ${
          fromSelf ? "bg-purple-primary" : "bg-light-pink"
        }  p-5 rounded-xl max-w-[500px]`}
      >
        <p className="text-slate-50  text-start break-words">{content}</p>
        <span className="text-[10px] text-end text-slate-100">
          {getMessageTime(date)}
        </span>
      </div>
    </div>
  );
};

export default Message;
