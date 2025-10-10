import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx"; // 1. Import the Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GameDev Co.", // You can update your site title here
  description: "Forging new worlds, one game at a time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer /> {/* 2. Place the Footer at the end */}
      </body>
    </html>
  );
}