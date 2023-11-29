import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "./head";

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
        <main className="bg-purple-primary">
          <nav className="p-5">
            <h1 className="text-white font-bold text-2xl">CHAT PLAY</h1>
          </nav>

          {children}
        </main>

        <footer>
          <h1></h1>
        </footer>
      </body>
    </html>
  );
}
