"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { useAuthContext } from "@/context/AuthContext";
// import { checkCustomerAuthenticated } from "@/functions";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type PrivateProps = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: PrivateProps) => {
  const [loading, setLoding] = useState(true);
  const { push } = useRouter();
  const { isAuthenticated } = useAuthContext();

  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      push(APP_ROUTES.public.login);
    } else {
      push(APP_ROUTES.private.chat.name);
    }

    setLoding(false);
  }, [isAuthenticated, push]);

  if (loading) {
    return null;
  }

  if (pathname === "/" || pathname === "/signup") {
    return <>{!isAuthenticated ? children : null}</>;
  }

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};
