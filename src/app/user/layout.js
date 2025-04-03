

// 'use client';
// import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// import Loader from '@/components/Loader'


// import profile from '../../../public/profile.png'
// import { RiUserLine, RiFileTextLine, RiNotificationLine, RiChatSmileLine, RiRestaurantLine, RiLogoutBoxLine } from "react-icons/ri";
// import { FaBeer, FaBars, FaUser } from 'react-icons/fa';
// import { Roboto } from 'next/font/google'
// import LoginPage2 from '../../components/Loginpage2';




// const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
// // import NavigationItem from '@/components/NavigationItem';

// const NavigationItem = ({ icon, text, to }) => {
//     const IconComponent = icon;
//     const pathname = usePathname();
//     console.log(pathname);
//     const isActive = pathname.startsWith(`/user/${to}`)




//     return (
//         <Link href={`/user/${to}`}

//             className={`hover:border-b-2 hover:bg-white border-primary p-3 text-center flex flex-row items-center rounded-l-md w-[90%] gap-2 ${isActive ? 'bg-white' : ''
//                 }`}
//         >
//             <div className="bg-primary rounded-full p-1">
//                 <IconComponent size={15} className={`text-white`} />
//             </div>
//             <h3>{text}</h3>

//         </Link>
//     );
// };

// export default function UserLayout({ children }) {
//     const session = useSession();

//     const [user, setUser] = useState(null);
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [profileFetched, setProfileFetched] = useState(false);
//     const { status } = session;
//     const [showMenu, setShowMenu] = useState(false);

//     useEffect(() => {
//         if (status === 'authenticated') {
//             fetch('/api/profile').then(response => {
//                 response.json().then(data => {
//                     setUser(data);

//                     setIsAdmin(data.admin);
//                     setProfileFetched(true);
//                 })
//             });
//         }
//     }, [session, status]);

//     if (status === 'loading') {
//         return <Loader />
//     }

//     if (status === 'unauthenticated') {
//         return <LoginPage2 />
//     }



//     const toggleMenu = () => {
//         setShowMenu(!showMenu);
//     };

//     const closeMenu = () => {
//         setShowMenu(false);
//     };


//     return (
//         <div className="mb-8">
//             <button
//                 onClick={toggleMenu}
//                 className="absolute md:hidden border-primary   flex  rounded-full bottom-5 right-5 p-0 m-0 h-4 w-4 border-0"
//             >
//                 <FaBars size={20} className="text-primary  flex" />
//                 {/* <h3>Menu</h3> */}
//             </button>
//             <div className="relative flex flex-col justify-center items-center rounded-lg w-full mb-4 mt-4 ">

//                 <div className="relative flex flex-col justify-between h-40 rounded-md w-full bgCont">
//                     {/* <Image src={banner} objectFit="content" className="flex -z-2 w-full overflow-clip rounded-md" alt="banner" /> */}
//                     <div className="absolute bg-white rounded-t-3xl h-1/2 z-200 bottom-0 w-full ">

//                         <h1 className="text-center absolute top-[50%] left-[42%]">Hi, Sonu Singh</h1>
//                     </div>
//                 </div>
//                 <Image src={profile} alt="profile" className="border-5 absolute" height={80} />

//             </div>

//             <div className="flex flex-col md:flex-row h-full rounded-lg p-4 bg-white">
//                 <div className="hidden  md:flex flex-col md:items-end bg-y2 pt-4 pb-4 rounded-l-md gap-1">

//                     <NavigationItem icon={RiUserLine} text="Profile" to="profile" />
//                     <NavigationItem icon={RiFileTextLine} text="My Orders" to="orders" />
//                     <NavigationItem icon={RiNotificationLine} text="Notifications" to="notification" />
//                     <NavigationItem icon={RiChatSmileLine} text="Feedback" to="feedback" />
//                     <NavigationItem icon={RiRestaurantLine} text="Dine in" to="dine-in" />
//                     {isAdmin && (
//                         <>
//                             <NavigationItem icon={FaBeer} text="Categories" to="categories" />
//                             <NavigationItem icon={FaBars} text="Menu-Items" to="menu-items" />
//                             <NavigationItem icon={FaUser} text="Users" to="users" />
//                         </>
//                     )}
//                     <button
//                         onClick={() => signOut()}
//                         className="hover:border-b-2 hover:bg-white border-primary p-3 text-center flex flex-row items-center rounded-l-md w-[90%] gap-2"
//                     >
//                         <div className="bg-primary rounded-full p-1">
//                             <RiLogoutBoxLine size={15} className={`text-white`} />
//                         </div>
//                         <h3>Logout</h3>
//                     </button>

//                 </div>


//                 <div className="absolute  md:w-1/4 md:hidden flex-col md:items-end bg-y2 pt-4 pb-4 rounded-l-md gap-1">

//                     <NavigationItem icon={RiUserLine} text="Profile" to="profile" />
//                     <NavigationItem icon={RiFileTextLine} text="My Orders" to="orders" />
//                     <NavigationItem icon={RiNotificationLine} text="Notifications" to="notification" />
//                     <NavigationItem icon={RiChatSmileLine} text="Feedback" to="feedback" />
//                     <NavigationItem icon={RiRestaurantLine} text="Dine in" to="dine-in" />
//                     {isAdmin && (
//                         <>
//                             <NavigationItem icon={FaBeer} text="Categories" to="categories" />
//                             <NavigationItem icon={FaBars} text="Menu-Items" to="menu-items" />
//                             <NavigationItem icon={FaUser} text="Users" to="users" />
//                         </>
//                     )}
//                     <button
//                         onClick={() => signOut()}
//                         className="hover:border-b-2 hover:bg-white border-primary p-3 text-center flex flex-row items-center rounded-l-md w-[90%] gap-2"
//                     >
//                         <div className="bg-primary rounded-full p-1">
//                             <RiLogoutBoxLine size={15} className={`text-white`} />
//                         </div>
//                         <h3>Logout</h3>
//                     </button>

//                 </div>

//                 <div className="bg-white md:w-3/4 rounded-r-lg p-4 flex justify-center">
//                     {children}
//                 </div>
//             </div>

//         </div>





//     )
// }









'use client';
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useRef } from "react";

import Loader from '@/components/Loader'


import profile from '../../../public/profile.png'
import { RiUserLine, RiFileTextLine, RiNotificationLine, RiChatSmileLine, RiRestaurantLine, RiLogoutBoxLine } from "react-icons/ri";
import { FaBeer, FaBars, FaUser } from 'react-icons/fa';
import { Roboto } from 'next/font/google'
import LoginPage2 from '../../components/Loginpage2';
import { TbNumber1Small } from "react-icons/tb";
import { useProfile } from "@/components/UseProfile";
import { CartContext } from "@/components/AppContext";




const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
// import NavigationItem from '@/components/NavigationItem';

const NavigationItem = ({ icon, text, to }) => {
    const IconComponent = icon;
    const pathname = usePathname();
    // console.log(pathname);
    const isActive = pathname.startsWith(`/user/${to}`)





    return (
        <Link href={`/user/${to}`}

            className={` hover:bg-white text-primary  border-primary p-3 text-center flex flex-row items-center  w-[95%] gap-2 m-1 ${isActive ? 'bg-white' : ''
                } rounded-md`}
        >
            <div className="bg-primary rounded-full p-1">
                <IconComponent size={15} className={`text-white`} />
            </div>
            <h3>{text}</h3>

        </Link>
    );
};

export default function UserLayout({ children }) {
    const session = useSession();
    // const profile = useProfile()
    const menuRef = useRef(null);
    // console.log(profile);




    // const [user, setUser] = useState(null);
    const { isAdmin } = useContext(CartContext)
    // const [profileFetched, setProfileFetched] = useState(false);
    const { data, status } = session;
    const [showMenu, setShowMenu] = useState(false);

    // useEffect(() => {
    //     if (status === 'authenticated') {

    //         // setUser(data.user);
    //         setProfileFetched(true);
    //     }
    // }, [session, status]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                // Clicked outside the menu, close it
                setShowMenu(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            // Cleanup the event listener on component unmount
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [menuRef]);

    if (status === 'loading') {
        return <Loader />
    }

    if (status === 'unauthenticated') {
        return <LoginPage2 />
    }



    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };


    return (
        <div className="pt-20 min-h-screen flex justify-center items-center bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80')`
            }}

        >
            {/* phone menu */}
            <div ref={menuRef} className="fixed bottom-5 right-5 w-full z-20 md:hidden">

                <div
                    onClick={toggleMenu}
                    className="absolute md:hidden border-secondry flex flex-col justify-center items-center rounded-full bottom-0 right-0  border-2 p-4 hover:border-primary"
                >
                    <FaBars size={20} className="text-primary flex" />
                    {/* <h3 className="flex">Menu</h3> */}
                </div>
                <div className={`absolute  ${!showMenu && "hidden"}  md:hidden grid ml-8 grid-cols-2 bg-y2 p-2 rounded-lg z-20 bottom-10 right-5 w-fit`}>

                    <NavigationItem icon={RiUserLine} text="Profile" to="profile" />
                    <NavigationItem icon={RiFileTextLine} text="My Orders" to="orders" />
                    <NavigationItem icon={RiNotificationLine} text="Notifications" to="notification" />
                    <NavigationItem icon={RiChatSmileLine} text="Feedback" to="feedback" />
                    <NavigationItem icon={RiRestaurantLine} text="Dine in" to="dine-in" />
                    {isAdmin && (
                        <>
                            <NavigationItem icon={FaBeer} text="Categories" to="categories" />
                            <NavigationItem icon={FaBars} text="Menu-Items" to="menu-items" />
                            <NavigationItem icon={FaUser} text="Users" to="users" />
                        </>
                    )}


                </div>
            </div>


            <div className="flex flex-col md:flex-row h-[80vh] max-h-[80vh]  rounded-lg p-4 bg-transparent w-[75%] gap-4 ">
                <div className="hidden w-1/4 xl:w-[20%] md:flex flex-col md:items-end bg-y2 pt-4 pb-4 rounded-md gap-0 shadow-md justify-center items-center ">

                    <NavigationItem icon={RiUserLine} text="Profile" to="profile" />
                    <NavigationItem icon={RiFileTextLine} text="My Orders" to="orders" />
                    <NavigationItem icon={RiNotificationLine} text="Notifications" to="notification" />
                    <NavigationItem icon={RiChatSmileLine} text="Feedback" to="feedback" />
                    <NavigationItem icon={RiRestaurantLine} text="Dine in" to="dine-in" />
                    {isAdmin && (
                        <>
                            <NavigationItem icon={FaBeer} text="Categories" to="categories" />
                            <NavigationItem icon={FaBars} text="Menu-Items" to="menu-items" />
                            <NavigationItem icon={FaUser} text="Users" to="users" />
                        </>
                    )}
                    <div className="flex w-full justify-center items-center">
                        <button
                            onClick={() => signOut()}
                            className="hover:border-b-2 hover:bg-white border-primary p-3 text-center flex flex-row items-center rounded-md w-[50%] gap-2"
                        >
                            <div className="bg-primary rounded-full p-1">
                                <RiLogoutBoxLine size={15} className={`text-white`} />
                            </div>
                            <h3>Logout</h3>
                        </button>
                    </div>

                </div>




                <div className="bg-white md:w-3/4 rounded-md flex justify-center shadow-md h-full overflow-y-auto">
                    {children}
                </div>
            </div>

        </div>





    )
}




