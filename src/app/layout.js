"use client";

import { AppProvider } from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Roboto } from 'next/font/google';
import './globals.css';
import { Toaster } from "react-hot-toast";
import { FaEnvelope, FaFacebook, FaInstagram, FaMobile, FaWhatsapp } from 'react-icons/fa';
import { SessionProvider } from "next-auth/react";
import LoginPage2 from "@/components/Loginpage2";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/components/AppContext";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <AppProvider>
        <LayoutContent>{children}</LayoutContent>
      </AppProvider>
    </SessionProvider>
  );
}

function LayoutContent({ children }) {
  const { openLoginPopup } = useContext(CartContext);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.className} overflow-x-hidden custom-scrollbar`}>
        <main className="max-w-auto mx-auto transition-all duration-200 delay-200 ease-linear">
          <Toaster />
          <Header />
          <div className="min-h-[580px] md:min-h-screen">
            {openLoginPopup && <LoginPage2 />}
            {children}
          </div>

          {/* Footer Section */}
          <Footer />

        </main>


      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="border-t p-4 text-center text-gray-500 mt-auto">
      &copy; 2025 Dining Venue. All rights reserved (Designed and Developed by <a>Giga Tech</a>)
    </footer>
  );
}










