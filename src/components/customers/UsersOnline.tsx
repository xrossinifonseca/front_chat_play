import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import { User } from "./User";
import { useSocketContext } from "@/context/SocketContext";

interface Customer {
  socketId: string;
  customerId: number;
  customerName: string;
  self: boolean;
}

const UsersOnline = ({ show }: { show: boolean }) => {
  const { socketInstance } = useSocketContext();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // criar uma funçao generica filtrar usuarios logado
    socketInstance.on("customersOnline", (customers: Customer[]) => {
      let constumersOn: Customer[] = [];
      customers.forEach((user) => {
        user.self = user.socketId === socketInstance.id;

        constumersOn.push(user);
      });

      constumersOn = constumersOn.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;

        if (a.customerId < b.customerId) return -1;
        return a.customerId > b.customerId ? 1 : 0;
      });

      setCustomers(constumersOn);
    });

    socketInstance.on("customersDisconnect", (data: Customer[]) => {
      let constumersOn: Customer[] = [];
      data.forEach((user) => {
        user.self = user.socketId === socketInstance.id;

        constumersOn.push(user);
      });

      constumersOn = constumersOn.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;

        if (a.customerId < b.customerId) return -1;
        return a.customerId > b.customerId ? 1 : 0;
      });

      setCustomers(constumersOn);
    });

    return () => {
      socketInstance.off("customers");
      socketInstance.off("newCustomer");
    };
  }, [socketInstance]);

  return (
    <div
      className={`absolute h-full top-[28%] ${
        show ? "left-0" : "-left-[1000px]"
      } transition-all lg:transition-none ease-in-out duration-500 w-full p-2 lg:p-0 bg-purple-secundary lg:rounded-2xl  z-50 lg:static  lg:w-2/5 lg:h-[500px]`}
    >
      <div className="text-center mt-4">
        <h1 className="text-xl text-light-pink">usuários online</h1>
      </div>

      <div className="h-full w-full p-2 overflow-y-hidden">
        {customers.length < 2 ? (
          <div className="text-center">
            <h1 className="text-gray-200 text-xl">
              Nenhum usuário na sala ainda.
            </h1>
          </div>
        ) : (
          <>
            {customers.map((customer) => (
              <User key={customer.customerId} customer={customer} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UsersOnline;
