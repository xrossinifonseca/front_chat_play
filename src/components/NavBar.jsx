import Image from "next/image";
import React from "react";
import imaasd from "../../public/icon.svg";
import { useAuthContext } from "@/context/AuthContext";
import { capitalizeString } from "@/functions/capitalizeString";

const NavBar = () => {
  const { customer, isAuthenticated, logout } = useAuthContext();

  return (
    <nav className="px-4 pt-2 grid place-items-center">
      <div className="flex items-center justify-between max-w-[1500px] w-full">
        <div className="flex items-center gap-2">
          <Image
            src="/icon.svg"
            width={50}
            height={50}
            className="w-10"
            alt="Picture of the author"
          />
          <h1 className="text-white font-bold text-xl lg:text-2xl">
            CHAT PLAY
          </h1>
        </div>

        {isAuthenticated && (
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-gray-200 text-center font-semibold lg:text-xl">
              Olá, {capitalizeString(customer.name)}
            </h1>
            <button
              type="button"
              onClick={logout}
              className="w-12 cursor-pointe"
            >
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier"></g>
                <g id="SVGRepo_tracerCarrier"></g>
                <g>
                  {" "}
                  <path
                    d="M31.52 8.55103C25.6805 8.55573 20.0548 10.7487 15.7526 14.6973C11.4504 18.6458 8.78426 24.0633 8.28 29.881H29.34L27.45 28.001C27.2634 27.8159 27.1151 27.5959 27.0136 27.3535C26.9121 27.111 26.8594 26.8509 26.8584 26.5881C26.8575 26.3253 26.9084 26.0648 27.0082 25.8217C27.108 25.5785 27.2547 25.3575 27.44 25.1711C27.6251 24.9844 27.8451 24.8361 28.0876 24.7346C28.33 24.6331 28.5901 24.5804 28.8529 24.5795C29.1158 24.5785 29.3762 24.6294 29.6194 24.7292C29.8625 24.829 30.0836 24.9757 30.27 25.161L35.6 30.461V30.471C35.7103 30.5794 35.8076 30.7002 35.89 30.831C35.9444 30.9168 35.9913 31.0071 36.03 31.101C36.04 31.121 36.05 31.131 36.05 31.151C36.0924 31.2581 36.1259 31.3685 36.15 31.481V31.501C36.1786 31.6256 36.1921 31.7532 36.19 31.881C36.1921 32.0089 36.1786 32.1365 36.15 32.261C36.1387 32.3645 36.1118 32.4657 36.07 32.561C36.061 32.596 36.0476 32.6296 36.03 32.661C36.0218 32.6851 36.0118 32.7085 36 32.731C35.9749 32.7953 35.9413 32.8558 35.9 32.911C35.877 32.9565 35.8503 33 35.82 33.041C35.7614 33.1274 35.6944 33.2078 35.62 33.281L35.6 33.301L30.27 38.661C30.0854 38.8473 29.8658 38.9953 29.6238 39.0966C29.3819 39.1978 29.1223 39.2503 28.86 39.251C28.5977 39.2503 28.3382 39.1978 28.0962 39.0966C27.8542 38.9953 27.6347 38.8473 27.45 38.661C27.2629 38.4773 27.114 38.2582 27.0121 38.0166C26.9102 37.7749 26.8573 37.5154 26.8563 37.2531C26.8554 36.9908 26.9065 36.731 27.0067 36.4886C27.1069 36.2462 27.2542 36.0261 27.44 35.841L29.39 33.881H8.28C8.78426 39.6987 11.4504 45.1162 15.7526 49.0648C20.0548 53.0134 25.6805 55.2063 31.52 55.211C37.7069 55.2063 43.6393 52.7471 48.0151 48.3732C52.3909 43.9993 54.8526 38.068 54.86 31.881C54.8526 25.6941 52.3909 19.7628 48.0151 15.3889C43.6393 11.015 37.7069 8.55579 31.52 8.55103Z"
                    className="fill-light-pink hover:fill-purple-secundary"
                  ></path>{" "}
                </g>
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
