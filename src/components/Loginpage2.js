"use client"

import { BsFillShieldLockFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import { useState, useRef, useEffect, useContext } from 'react';
import PhoneInput from 'react-phone-input-2';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { auth } from '../libs/firebase';
import { signIn } from 'next-auth/react';
import { CartContext } from "@/components/AppContext";
import Image from 'next/image';
import logo from '../../public/logo.png'
import banner from '../../public/banner.jpg'
let OtpInput;

if (typeof window !== 'undefined') {
    import('otp-input-react').then((module) => {
        OtpInput = module.default;
    });
}

export default function LoginPage2() {
    const loginref = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [otp, setOtp] = useState('');
    const [ph, setPh] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const { setOpenLoginPopup } = useContext(CartContext);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);

    function closeModal() {
        setModalIsOpen(false);
    }

    function setupRecaptcha() {
        // Only create the recaptchaVerifier if it doesn't exist
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: () => {
                    setRecaptchaVerified(true);
                },
                'expired-callback': () => {
                    setRecaptchaVerified(false);
                    toast.error('reCAPTCHA has expired. Please refresh the page.');
                },
            });
        }
        return window.recaptchaVerifier;
    }

    async function onSignup() {
        if (!ph || ph.length < 10) {
            toast.error('Please enter a valid phone number');
            return;
        }

        setLoading(true);

        try {
            const recaptchaVerifier = setupRecaptcha();
            const formattedPhone = '+' + ph;

            const confirmationResult = await signInWithPhoneNumber(
                auth,
                formattedPhone,
                recaptchaVerifier
            );

            setConfirm(confirmationResult);
            toast.success('OTP sent successfully!');
            setShowOTP(true);

            // Start resend timer (60 seconds)
            setResendDisabled(true);
            setResendTimer(60);
        }
        catch (error) {
            console.error("Error sending OTP:", error);

            // Handle specific error cases
            if (error.code === 'auth/invalid-phone-number') {
                toast.error('Invalid phone number format');
            } else if (error.code === 'auth/too-many-requests') {
                toast.error('Too many requests. Please try again later');
            } else if (error.code === 'auth/captcha-check-failed') {
                toast.error('CAPTCHA verification failed. Please refresh the page');
                // Reset recaptcha on failure
                if (window.recaptchaVerifier) {
                    window.recaptchaVerifier.clear();
                    window.recaptchaVerifier = null;
                }
            } else {
                toast.error('Failed to send OTP. Please try again');
            }
        }
        finally {
            setLoading(false);
        }
    }

    async function onOTPVerify(e) {
        e.preventDefault();

        if (!otp || otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);

        try {
            const result = await confirm.confirm(otp);
            const idToken = await result.user.getIdToken();

            toast.success('OTP verified successfully!');
            await signIn('credentials', { phone: ph, otp: idToken });
            setUser(result.user);
            setOpenLoginPopup(false);
        }
        catch (error) {
            console.error("Error verifying OTP: ", error);

            if (error.code === 'auth/invalid-verification-code') {
                toast.error('Invalid OTP. Please check and try again');
            } else if (error.code === 'auth/code-expired') {
                toast.error('OTP has expired. Please request a new one');
                setShowOTP(false);
            } else {
                toast.error('Failed to verify OTP. Please try again');
            }
        }
        finally {
            setLoading(false);
        }
    }

    async function handleResendOTP() {
        if (resendDisabled) return;

        // Reset OTP field
        setOtp('');

        // Clear existing recaptcha to avoid duplicate issues
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
        }

        // Send new OTP
        await onSignup();
    }

    useEffect(() => {
        // Timer for resend button
        let interval;
        if (resendDisabled && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        setResendDisabled(false);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [resendDisabled, resendTimer]);

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
    }, [loginref, setOpenLoginPopup]);

    // Clean up recaptcha on component unmount
    useEffect(() => {
        return () => {
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        };
    }, []);

    return (
        <div className="absolute inset-0 bg-black bg-opacity-80 backdrop flex justify-center items-center z-30">
            <div ref={loginref} className='bg-white flex w-full m-4 sm:m-0 sm:w-3/4 lg:w-1/2 rounded-lg'>
                {/* side */}
                <div className='w-[40%] hidden md:block'>
                    <div className="relative bg-gray-200 text-center m-0 overflow-clip justify-start h-full">
                        <Image
                            src={banner}
                            layout="fill"
                            objectFit="cover"
                            className="absolute top-0 left-0 w-full h-full"
                            alt="banner"
                        />
                    </div>
                </div>
                {/* side2 */}
                <div className='flex flex-col justify-center items-center w-full md:w-[60%] p-4'>
                    <div className="flex flex-col pb-4 rounded-lg w-full max-w-md">
                        <Toaster toastOptions={{ duration: 4000 }} />
                        <div id="recaptcha-container"></div>
                        {user ? (
                            <h2 className="text-center text-primary font-medium text-2xl">
                                👍 Login Success
                            </h2>
                        ) : (
                            <>
                                <div className="flex text-3xl rounded-full font-black font-serif justify-center">
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
                                            className="opt-container"
                                        />
                                        <button
                                            onClick={onOTPVerify}
                                            className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded mt-4"
                                            disabled={loading}
                                        >
                                            {loading && (
                                                <CgSpinner
                                                    size={20}
                                                    className="mt-1 animate-spin"
                                                />
                                            )}
                                            <span>Verify OTP</span>
                                        </button>

                                        <div className="mt-4 text-center">
                                            <button
                                                onClick={handleResendOTP}
                                                className={`text-sm ${resendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-primary cursor-pointer'}`}
                                                disabled={resendDisabled}
                                            >
                                                {resendDisabled
                                                    ? `Resend OTP in ${resendTimer}s`
                                                    : 'Resend OTP'}
                                            </button>
                                        </div>
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
                                            inputClass="w-full p-2 border rounded"
                                            containerClass="my-4"
                                        />
                                        <button
                                            onClick={onSignup}
                                            className="bg-primary w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                            disabled={loading}
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





//original


// "use client"

// import { BsFillShieldLockFill } from 'react-icons/bs';
// import { CgSpinner } from 'react-icons/cg';
// import { useState, useRef } from 'react';
// import PhoneInput from 'react-phone-input-2';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import { toast, Toaster } from 'react-hot-toast';
// import { auth } from '../libs/firebase';
// import { signIn } from 'next-auth/react';
// import { AppProvider, CartContext } from "@/components/AppContext";
// import { useContext, useEffect } from "react";
// import Image from 'next/image';
// import logo from '../../public/logo.png'
// import banner from '../../public/banner.jpg'
// let OtpInput;

// if (typeof window !== 'undefined') {
//     import('otp-input-react').then((module) => {
//         OtpInput = module.default;
//     });
// }


// // Set the root element to ensure accessibility

// export default function LoginPage2() {
//     const loginref = useRef(null);
//     const [modalIsOpen, setModalIsOpen] = useState(true);
//     const [otp, setOtp] = useState('');
//     const [ph, setPh] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [showOTP, setShowOTP] = useState(false);
//     const [user, setUser] = useState(null);
//     const [confirm, setConfirm] = useState(null);
//     const { setOpenLoginPopup } = useContext(CartContext)



//     function openModal() {
//         setModalIsOpen(true);
//     }

//     function closeModal() {
//         setModalIsOpen(false);
//     }

//     function onCaptchVerify() {
//         if (!window.recaptchaVerifier) {
//             window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//                 size: 'invisible',
//                 callback: (response) => {
//                     onSignup();
//                 },
//                 'expired-callback': () => { },
//             });
//         }
//     }

//     async function onSignup() {
//         setLoading(true);

//         try {
//             // const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
//             //     size: 'invisible',
//             //     callback: (response) => {
//             //         onSignup();
//             //     },
//             //     'expired-callback': () => { },
//             // });

//             await onCaptchVerify();
//             console.log("phone no:", ph);


//             const confirmationResult = await signInWithPhoneNumber(auth, '+' + ph, window.recaptchaVerifier);
//             setConfirm(confirmationResult);
//             toast.success('OTP sent successfully!');
//             setLoading(false);
//             setShowOTP(true);



//         }
//         catch (error) {
//             console.error("Error sending otp:", error);
//             setLoading(false);


//         }


//     };

//     async function onOTPVerify(e) {
//         e.preventDefault();

//         try {
//             const result = await confirm.confirm(otp);

//             const idToken = await result.user.getIdToken();
//             setLoading(true);
//             toast.success('OTP verified!');
//             await signIn('credentials', { phone: ph, otp: idToken });
//             setLoading(false);
//             setOpenLoginPopup(false);

//         }
//         catch (error) {

//             setLoading(false);
//             console.error("Error verifiying OTP: ", error);

//         }

//     }

//     useEffect(() => {
//         const handleOutsideClick = (event) => {
//             if (loginref.current && !loginref.current.contains(event.target)) {
//                 setOpenLoginPopup(false);
//             }
//         };

//         document.addEventListener("mousedown", handleOutsideClick);

//         return () => {
//             document.removeEventListener("mousedown", handleOutsideClick);
//         };
//     }, [loginref]);

//     return (

//         <div className="absolute inset-0 bg-black bg-opacity-80 backdrop flex justify-center items-center z-30">

//             <div ref={loginref} className='bg-white flex w-full  m-4 sm:m-0 sm:w-3/4 lg:w-1/2 rounded-lg  '>
//                 {/* side */}
//                 <div className='w-[40%] '>
//                     <div className="relative bg-gray-200 text-center m-0 overflow-clip justify-start h-full ">
//                         <Image
//                             src={banner}
//                             layout="fill"
//                             objectFit="cover"
//                             className="absolute top-0 left-0 w-full h-full"
//                             alt="pizza"
//                         />
//                     </div>

//                 </div>
//                 {/* side2 */}
//                 <div className='flex flex-col justify-center items-center w-full md:w-[60%] p-4'>

//                     <div className=" flex flex-col pb-4 rounded-lg ">
//                         <Toaster toastOptions={{ duration: 4000 }} />
//                         <div id="recaptcha-container"></div>
//                         {user ? (
//                             <h2 className="text-center text-primary font-medium text-2xl">
//                                 👍Login Success
//                             </h2>
//                         ) : (
//                             <>
//                                 <div className="flex text-3xl  rounded-full font-black font-serif justify-center">
//                                     <Image
//                                         src={logo}
//                                         alt="the dining venue logo"
//                                         className='h-20 w-20 md:w-40 md:h-40'
//                                     />
//                                 </div>
//                                 <h1 className="text-center leading-normal text-2xl mb-4 font-bold text-amber-400">
//                                     Your Tasty Food <br /> Just A Login Away
//                                 </h1>
//                                 {showOTP ? (
//                                     <>
//                                         <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//                                             <BsFillShieldLockFill size={30} />
//                                         </div>
//                                         <label
//                                             htmlFor="otp"
//                                             className="font-bold text-xl text-black text-center"
//                                         >
//                                             Enter your OTP
//                                         </label>
//                                         <OtpInput
//                                             value={otp}
//                                             onChange={setOtp}
//                                             OTPLength={6}
//                                             otpType="number"
//                                             disabled={false}
//                                             autoFocus
//                                             className="opt-container "
//                                         />
//                                         <button
//                                             onClick={onOTPVerify}
//                                             className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                                         >
//                                             {loading && (
//                                                 <CgSpinner
//                                                     size={20}
//                                                     className="mt-1 animate-spin"
//                                                 />
//                                             )}
//                                             <span>Verify OTP</span>
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <label
//                                             htmlFor=""
//                                             className="font-bold text-xl text-primary text-center"
//                                         >
//                                             Verify your phone number
//                                         </label>
//                                         <PhoneInput
//                                             country={'in'}
//                                             value={ph}
//                                             onChange={setPh}
//                                         />
//                                         <button
//                                             onClick={onSignup}
//                                             className="bg-primary w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                                         >
//                                             {loading && (
//                                                 <CgSpinner
//                                                     size={20}
//                                                     className="mt-1 animate-spin"
//                                                 />
//                                             )}
//                                             <span>Send OTP</span>
//                                         </button>
//                                     </>
//                                 )}
//                             </>
//                         )}
//                     </div>


//                 </div>

//             </div>
//         </div>

//     );
// }








