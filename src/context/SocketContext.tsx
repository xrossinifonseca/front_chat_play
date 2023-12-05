'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import { socket } from "@/functions/socket";
import { notifcation } from "@/functions/notifcations";

interface SocketProps {
  socketInstance: Socket;
}

const SocketContext = createContext<SocketProps>({} as SocketProps);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socketInstance] = useState(socket());
  const { token, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    socketInstance.auth = { token };

    socketInstance.connect();

    return () => {
      socketInstance.disconnect();
    };
  }, [socketInstance, token, isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socketInstance}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
