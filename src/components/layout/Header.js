'use client';
import CartPage from "@/app/cart/page";
import { CartContext } from "@/components/AppContext";
import Bars2 from "@/components/icons/Bars2";
import ShoppingCart from "@/components/icons/ShoppingCart";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import profile from '../../../public/profile.png'

import Profilemenu from '@/components/Profilemenu'
import { FaSignInAlt } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import logo from '../../../public/logo.png'

import { RiLogoutBoxLine } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';




function AuthLinks({ status, userName, mobileNavOpen }) {
  const { openLoginPopup, setOpenLoginPopup } = useContext(CartContext)

  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleClick = (e) => {
    // e.preventDefault();
    console.log(openLoginPopup);
    setOpenLoginPopup(!openLoginPopup);
    console.log(openLoginPopup);


  }


  if (status === 'authenticated') {
    return (
      <>



        <Link href={'/user/profile'} className="whitespace-nowrap flex justify-center flex-col items-center " onMouseEnter={handleMenuToggle}
          onMouseLeave={handleMenuToggle} >

          <Image src={profile} alt="profilephoto" height={30} width={30} />
          Hello, {userName}
          {isMenuOpen && !mobileNavOpen && <div className="absolute top-10 right-30 z-20">
            <Profilemenu userName={userName} />
          </div>}

        </Link>



      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <button
          onClick={handleClick}
          className="flex items-center gap-1 px-4 py-2 bg-gray-200   hover:bg-primary text-primary bg-opacity-90 hover:text-y3 rounded-full transition-all duration-300"
        >
          Login
          <FiLogIn size={20} />
        </button>

      </>
    );
  }
}

export default function Header() {
  const cartRef = useRef(null);
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts, clearCart } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openCart, setopenCart] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const links = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about-us', label: 'About' },
    { href: '/contact-us', label: 'Contact' },
    // { href: '/book-table', label: 'Book a table' },
  ];
  const handleCartClick = (e) => {
    e.preventDefault();
    setopenCart(!openCart);

  }

  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: '/' });
    clearCart();
    router.push('/');
  };



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setopenCart(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [cartRef]);

  return (
    <header className="">
      {/* small devices navbar */}
      <div className={`flex w-full items-center md:hidden justify-between fixed z-40 transition-all duration-200 pr-4 bg-white  ${scrolled ? 'bg-opacity-100' : 'md:bg-opacity-70'}`}>
        <Link className="flex text-primary font-semibold text-2xl rounded-full  m-1 items-center" href={'/'} >
          <Image src="/logo.png" alt="Your Logo" height={80} width={80} className="m-0 p-0" />
          <div className="">
            <h1 className="md:hide font-sans font-extrabold text-lg sm:text-2xl">Dining Venue</h1>
            {/* <p1 className="md:hide text-y3 font-sans text-md sm:text-xl">Multicuisine Resturant & Cafe</p1> */}
          </div>
        </Link>
        <div className="flex gap-8 items-center">

          <button className="relative p-1" onClick={handleCartClick}  >
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </button>


          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen(prev => !prev)}>
            <Bars2 />
          </button>
        </div>
      </div>
      <AnimatePresence mode='wait'>
        {mobileNavOpen && (
          <AnimatePresence mode='wait'>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0, ease: 'linear' }}
              onClick={() => setMobileNavOpen(false)}
              className="z-50 md:hidden fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-70 flex items-start justify-start"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'linear' }}
                className="p-6 bg-white min-h-screen w-80"
              >
                <div
                  className="relative flex flex-col items-center mb-6 pb-4 border-b-primary border-b-2"
                >
                  <Image
                    src={logo}
                    alt="The Dining venue"
                    className="h-20 w-20 mr-2"
                  />
                  {/* <h1 className="text-sm  font-bold text-primary">The Biryani Adda</h1> */}
                </div>
                {links.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: 'linear' }}
                    className="mb-4"
                  >
                    <Link
                      href={link.href}
                      className="flex flex-col font-bold justify-between items-center group text-primary hover:text-primary transition-colors duration-200 ease-linear border-b-2 hover:border-b-primary pb-2"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <AuthLinks mobileNavOpen={mobileNavOpen} status={status} userName={userName} />
                <div className="absolute bottom-4 left-4">

                  {status === "authenticated" &&
                    <div
                      onClick={handleSignOut}
                      className="flex items-center justify-center rounded-full w-16 h-16 border-2 border-primary cursor-pointer"
                    >
                      <div className="flex items-center justify-center bg-primary rounded-full w-12 h-12">
                        <RiLogoutBoxLine className="text-y3" size={20} />
                      </div>
                    </div>
                  }

                </div>
              </motion.div>
            </motion.div>

          </AnimatePresence>
        )}
      </AnimatePresence>


      <div className="hidden md:flex w-full  justify-center">
        <div className={`hidden md:flex items-center justify-between w-[80%] m-0 px-10 mt-2  fixed z-40 transition-all duration-200 bg-white  ${scrolled ? 'bg-opacity-100' : 'bg-opacity-70'} rounded-full `}>
          <nav className={`flex justify-center items-center gap-8 ${scrolled ? "text-primary" : "text-primary"} font-semibold`}>
            <Link className=" font-semibold text-2xl" href={'/'}>
              <Image src="/logo.png" alt="Your Logo" height={80} width={80} />

            </Link>

            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col justify-between items-center group"
              >
                {label}
                <span
                  className={`opacity-0 w-2 h-2 ${scrolled ? "bg-primary" : "bg-primary"} rounded-full group-hover:opacity-100`}
                ></span>
              </Link>
            ))}




          </nav>
          <nav className="flex items-center gap-4 text-gray-500 font-semibold">
            <AuthLinks status={status} userName={userName} />

            <button className="relative p-1 bg-white bg-opacity-90" onClick={handleCartClick} >
              <ShoppingCart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </button>
          </nav>

        </div>
      </div>
      {openCart && (
        <motion.div
          ref={cartRef}
          initial={{ opacity: 1, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 1, x: '100%' }}
          transition={{ duration: .5, ease: 'linear' }}
          className={`z-50 cart ${openCart ? 'open' : ''} rounded-l-3xl xl:w-[25%] my-2 border-[3px] border-r-0`}
        >
          <div className="bg-white rounded-l-3xl p-4">
            <CartPage />
          </div>
        </motion.div>
      )}

    </header >
  );
}