import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Loading from "./Loading";
interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  text: string;
  loading?: boolean;
}

const Button = ({ text, loading, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="p-4 w-full lg:w-3/5 rounded-lg bg-purple-primary text-white font-semibold text-2xl grid place-items-center"
    >
      {loading ? <Loading /> : text}
    </button>
  );
};

export default Button;
