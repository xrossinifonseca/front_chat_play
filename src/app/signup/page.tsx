import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="min-h-screen grid place-items-center p-2">
      <div className="max-w-[600px]  w-full rounded-xl shadow-lg bg-light-pink p-5 py-10 flex flex-col items-center justify-center gap-5">
        <h1 className="text-center text-white font-semibold text-2xl lg:text-4xl">
          CRIE SUA CONTA
        </h1>

        <SignUpForm />

        <div>
          <p className="text-sm text-center">
            Ja possui uma conta?{" "}
            <span className="text-purple-primary font-semibold">
              <Link href="/">Entrar</Link>{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
