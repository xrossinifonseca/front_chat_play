"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  errorText?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorText, ...props }, ref) => {
    return (
      <div className="w-full grid place-items-center">
        <input
          {...props}
          ref={ref}
          className={`p-4 w-full lg:w-4/5 border-2 ${
            errorText ? "border-red-600" : "border-transparent"
          } rounded-lg focus:border-purple-primary focus:outline-none transition-all ease-in-out duration-500`}
        />
        {errorText && (
          <p className="text-red-600 text-sm mt-1 text-start">{errorText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
