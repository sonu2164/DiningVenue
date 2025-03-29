import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
// import { ArrowDropDownIcon } from '@mui/icons-material/ArrowDropDown';
import { RiLogoutBoxLine } from "react-icons/ri";
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { CartContext, cartProductPrice } from "@/components/AppContext";

const ProfileMenu = ({ userName }) => {
    const router = useRouter();
    const { clearCart } = useContext(CartContext);


    const handleSignOut = async () => {
        await signOut({ redirect: false, callbackUrl: '/' });
        clearCart();
        router.push('/');
    };


    return (
        <div className='bg-white rounded-lg p-4 flex flex-col gap-2'>
            <div className='border-b-2 border-b-primary/10 p-2'>
                Hello,{userName}
                <div>

                    <button
                        onClick={handleSignOut}
                        className="bg-primary rounded-full text-white px-8 py-2"
                    >
                        <RiLogoutBoxLine />
                    </button>

                </div>

            </div>
            <div className='flex flex-row w-full gap-2'>
                <div className='w-1/2 flex flex-col border-r-2 border-r-primary/10 p-2'>
                    <Link href="/user/orders">
                        My Orders

                    </Link>
                    <Link href="/user/notification">
                        Notification

                    </Link>
                    <Link href="/user/dinein">
                        Dine-in

                    </Link>
                    <Link href="/refer&earn">
                        Refer and Earn

                    </Link>



                </div>
                <div className='w-1/2 flex flex-col p-2'>
                    <Link href="/about">
                        About

                    </Link>
                    <Link href="/#contact">
                        Contact-us

                    </Link>
                    <Link href="/user">
                        Catering

                    </Link>
                    <Link href="/tnc">
                        Terms and condition

                    </Link>


                </div>
            </div>


        </div>
    );
};

export default ProfileMenu;
