'use client';
import EditableImage from "@/components/layout/EditableImage";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import banner from '../../../public/banner.jpg'
import profile from '../../../public/profile.png'
import { RiUserLine, RiFileTextLine, RiNotificationLine, RiChatSmileLine, RiRestaurantLine, RiLogoutBoxLine } from "react-icons/ri";
import Loader from '@/components/Loader'
import LoginPage2 from '../../components/Loginpage2';





export default function ProfilePage() {
    const session = useSession();

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data);
                    console.log(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status]);

    if (status === 'loading' || !profileFetched) {

        return <Loader />
    }

    if (status === 'unauthenticated') {
        return <LoginPage2 />
    }

    return (


        <div className="bg-white w-3/4 rounded-r-lg p-4 ">
            <h1>Profile</h1>




        </div >







    );
}