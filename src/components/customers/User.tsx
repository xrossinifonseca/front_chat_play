import { capitalizeString } from "@/functions/capitalizeString";

interface ContactProps {
  customerId: number;
  customerName: string;
  self: boolean;
  socketId: string;
}

export const User = ({ customer }: { customer: ContactProps }) => {
  const { customerName, self } = customer;

  return (
    !self && (
      <div>
        <div className="w-full flex justify-between p-5 border-gray-100 border-b  cursor-pointer">
          <h1 className="text-gray-200 font-semibold">
            {capitalizeString(customerName)}
          </h1>
          <h2 className="text-sm bg-green-300 h-2 w-2 rounded-full p-2"></h2>
        </div>
      </div>
    )
  );
};
