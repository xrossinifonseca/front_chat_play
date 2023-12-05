import { useAuthContext } from "@/context/AuthContext";
import { socket } from "@/functions/socket";
import { useEffect, useState } from "react";

export const useSocket = () => {
  const [socketInstance] = useState(socket());

  const { token } = useAuthContext();

  useEffect(() => {
    socketInstance.auth = { token };

    socketInstance.connect();

    return () => {
      socketInstance.disconnect();
    };
  }, [socketInstance, token]);

  return { socketInstance };
};
