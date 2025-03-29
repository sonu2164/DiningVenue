
"use client"

import { BsFillShieldLockFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import { useState, useRef } from 'react';
import PhoneInput from 'react-phone-input-2';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { auth } from '../libs/firebase';
import { signIn } from 'next-auth/react';
import { AppProvider, CartContext } from "@/components/AppContext";
import { useContext, useEffect } from "react";
import Image from 'next/image';
import logo from '../../public/logo.png'
import banner from '../../public/banner.jpg'
let OtpInput;

if (typeof window !== 'undefined') {
    import('otp-input-react').then((module) => {
        OtpInput = module.default;
    });
}

// const firebaseConfig = {
//     apiKey: "AIzaSyDeAlwR3SsPq_IacoweW3bPAlY5UBENL7g",
//     authDomain: "explore-7e45a.firebaseapp.com",
//     projectId: "explore-7e45a",
//     storageBucket: "explore-7e45a.appspot.com",
//     messagingSenderId: "919711572322",
//     appId: "1:919711572322:web:b790cc2c617fa0fc160c3b",
//     measurementId: "G-198EZM6GH0"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// Set the root element to ensure accessibility

export default function LoginPage2() {
    const loginref = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [otp, setOtp] = useState('');
    const [ph, setPh] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const { setOpenLoginPopup } = useContext(CartContext)



    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: (response) => {
                    onSignup();
                },
                'expired-callback': () => { },
            });
        }
    }

    async function onSignup() {
        setLoading(true);

        try {
            // const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
            //     size: 'invisible',
            //     callback: (response) => {
            //         onSignup();
            //     },
            //     'expired-callback': () => { },
            // });

            await onCaptchVerify();
            console.log("phone no:", ph);


            const confirmationResult = await signInWithPhoneNumber(auth, '+' + ph, window.recaptchaVerifier);
            setConfirm(confirmationResult);
            toast.success('OTP sent successfully!');
            setLoading(false);
            setShowOTP(true);



        }
        catch (error) {
            console.error("Error sending otp:", error);
            setLoading(false);


        }


    };

    async function onOTPVerify(e) {
        e.preventDefault();

        try {
            const result = await confirm.confirm(otp);

            const idToken = await result.user.getIdToken();
            setLoading(true);
            toast.success('OTP verified!');
            await signIn('credentials', { phone: ph, otp: idToken });
            setLoading(false);
            setOpenLoginPopup(false);

        }
        catch (error) {

            setLoading(false);
            console.error("Error verifiying OTP: ", error);

        }

    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (loginref.current && !loginref.current.contains(event.target)) {
                setOpenLoginPopup(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [loginref]);

    return (

        <div className="absolute inset-0 bg-black bg-opacity-80 backdrop flex justify-center items-center z-30">

            <div ref={loginref} className='bg-white flex w-full  m-4 sm:m-0 sm:w-3/4 lg:w-1/2 rounded-lg  '>
                {/* side */}
                <div className='w-[40%] '>
                    <div className="relative bg-gray-200 text-center m-0 overflow-clip justify-start h-full ">
                        <Image
                            src={banner}
                            layout="fill"
                            objectFit="cover"
                            className="absolute top-0 left-0 w-full h-full"
                            alt="pizza"
                        />
                    </div>

                </div>
                {/* side2 */}
                <div className='flex flex-col justify-center items-center w-full md:w-[60%] p-4'>

                    <div className=" flex flex-col pb-4 rounded-lg ">
                        <Toaster toastOptions={{ duration: 4000 }} />
                        <div id="recaptcha-container"></div>
                        {user ? (
                            <h2 className="text-center text-primary font-medium text-2xl">
                                👍Login Success
                            </h2>
                        ) : (
                            <>
                                <div className="flex text-3xl  rounded-full font-black font-serif justify-center">
                                    <Image
                                        src={logo}
                                        alt="the dining venue logo"
                                        className='h-20 w-20 md:w-40 md:h-40'
                                    />
                                </div>
                                <h1 className="text-center leading-normal text-2xl mb-4 font-bold text-amber-400">
                                    Your Tasty Food <br /> Just A Login Away
                                </h1>
                                {showOTP ? (
                                    <>
                                        <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                                            <BsFillShieldLockFill size={30} />
                                        </div>
                                        <label
                                            htmlFor="otp"
                                            className="font-bold text-xl text-black text-center"
                                        >
                                            Enter your OTP
                                        </label>
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            OTPLength={6}
                                            otpType="number"
                                            disabled={false}
                                            autoFocus
                                            className="opt-container "
                                        />
                                        <button
                                            onClick={onOTPVerify}
                                            className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                        >
                                            {loading && (
                                                <CgSpinner
                                                    size={20}
                                                    className="mt-1 animate-spin"
                                                />
                                            )}
                                            <span>Verify OTP</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <label
                                            htmlFor=""
                                            className="font-bold text-xl text-primary text-center"
                                        >
                                            Verify your phone number
                                        </label>
                                        <PhoneInput
                                            country={'in'}
                                            value={ph}
                                            onChange={setPh}
                                        />
                                        <button
                                            onClick={onSignup}
                                            className="bg-primary w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                        >
                                            {loading && (
                                                <CgSpinner
                                                    size={20}
                                                    className="mt-1 animate-spin"
                                                />
                                            )}
                                            <span>Send OTP</span>
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>


                </div>

            </div>
        </div>

    );
}








