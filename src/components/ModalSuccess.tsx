"use client";

import Link from "next/link";
import Button from "./Button";

const ModalSuccess = () => {
  return (
    <div className="fixed top-0 left-0 h-screen z-50 grid place-items-center w-screen px-4">
      <div className="bg-black fixed top-0 h-screen left-0 -z-10 w-screen opacity-50"></div>

      <div className="lg:w-[400px] h-[300px] bg-white flex flex-col items-center justify-end gap-5 pb-10 p-5 relative rounded-2xl">
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          fill="#67dc97"
          className="max-w-[200px] absolute -top-20"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#67dc97"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
            ></path>
          </g>
        </svg>

        <h1 className="font-semibold text-2xl text-center text-slate-700">
          Cadastro realizado com sucesso!
        </h1>

        <Link href="/chat" className="w-full grid place-items-center">
          <Button type="button" text="continuar" />
        </Link>
      </div>
    </div>
  );
};

export default ModalSuccess;
