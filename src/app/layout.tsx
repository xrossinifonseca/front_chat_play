"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "./head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { PrivateRoute } from "@/components/privateRoute";
import { SocketProvider } from "@/context/SocketContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body className={poppins.className}>
        <AuthProvider>
          <PrivateRoute>
            <SocketProvider>
              <main className="overflow-hidden relative bg-purple-primary">
                <ToastContainer />
                <NavBar />
                {children}
                <Footer />
              </main>
            </SocketProvider>
          </PrivateRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
