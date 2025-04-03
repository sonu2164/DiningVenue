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
          {/* footer */}
          <div className="flex-shrink-0">

            <section className="text-center text-white text-xl bg-primary h-50   md:block  inset-0" id="contact">
              <div className="flex flex-col md:flex-row p-4 justify-center ">
                <div className="w-full md:w-1/3  text-center flex flex-col justify-center items-center border-b  xl:border-b-0 py-5">
                  <div className="rounded-full bg-white">
                    <Image src="/logo.png" alt="thebiryaniadda" height={200} width={200} />
                  </div>
                  <div className="flex  flex-col gap-2 justify-center items-center">
                    <div className="mb-2 md:mb-0">Follow us on</div>
                    <div className="flex flex-row gap-2">
                      {/* Facebook Icon */}
                      <a href="https://www.facebook.com/people/Dining-venue-Restaurant-cafe/61556588888977/" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={24} color="#fff" />
                      </a>
                      {/* Instagram Icon */}
                      <a href="https://www.instagram.com/dining.venue/?hl=en" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={24} color="#fff" />
                      </a>
                    </div>
                    <div>
                      <div className="mb-2 md:mb-0">
                        Contact Us
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <a href="tel:+918009769707">
                          <FaMobile size={24} color="#fff" />
                        </a>

                        <a href="https://wa.me/918009769707">
                          <FaWhatsapp size={24} color="#fff" />
                        </a>

                        <a href="mailto:divingvenue07@gmail.com">
                          <FaEnvelope size={24} color="#fff" />
                        </a>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="flex flex-col  w-full md:w-1/3   justify-center border-b xl:border-b-0 py-5">
                  <h1 className="text-xl text-red-600 text-left w-full">
                    Hubmly Request
                  </h1>
                  <p className="text-left w-full mb-4">Please give us 25 minutes <br />
                    for all major meal prepration <br />
                    to maintain & enchance best <br />
                    quality in you meal.</p>
                  <p className="text-left font-bold text-xl mb-4"> Timing : </p>
                  <p className="text-left">


                    Opening : 11 am <br />

                    Closing: 11 pm <br />

                    Dinner: Daily from 6pm - 12pm
                  </p>



                </div>

                <div className="w-full flex flex-col justify-center items-center  md:w-1/3  text-center md:text-left py-10 ">
                  {/* Business address */}
                  <p className="text-center">Near Basahia buzurg, Basahia Buzurg, Partawal <br /> Uttar Pradesh 273301</p>

                  <div className="mt-2 shadow-xl">
                    <iframe className="rounded-lg shadow-lg" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.130498282406!2d83.58233867489676!3d26.962766457938766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399155d45a79ad6f%3A0xed67bbdbee59101!2sDINING%20Venue%20%2C%20Multicuisine%20Restaurant%20%26%20cafe!5e0!3m2!1sen!2sin!4v1742642635196!5m2!1sen!2sin" width="400" height="300" style={{ "border": "0" }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                  </div>
                  {/* Phone number */}

                </div>
              </div>
            </section>
          </div>

          <Footer />

        </main>


      </body>
    </html>
  );
}

function Footer() {
  return (

    <footer className="border-t text-center text-gray-500 mt-auto">
      &copy; 2025 Dining Venue. All rights reserved (Designed and Developed by <a>Giga Tech</a>)
    </footer>
  );
}










