import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "./head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

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
        <main className="overflow-hidden relative bg-purple-primary">
          <NavBar />
          {children}

          <Footer />
        </main>
      </body>
    </html>
  );
}
