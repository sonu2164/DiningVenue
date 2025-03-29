'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from '@/components/Loader'
import LoginPage2 from '@/components/Loginpage2'
export default function CartPage() {
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    let userEmail = userData?.email;


    const [Loading2, setLoading2] = useState(false);
    const { cartProducts, removeCartProduct, paymentMethod, deliveryOption, setOpenLoginPopup } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const { data: profileData } = useProfile();
    // const { menuItem, selectedExtras, selectedFree, qunatity, selectedSize } = cartProducts;


    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment failed 😔');
            }
        }
    }, []);

    useEffect(() => {
        if (profileData?.city) {

            const { phone, streetAddress, city, postalCode, country } = profileData;
            const addressFromProfile = {
                phone,
                streetAddress,
                city,
                postalCode,
                country
            };
            setAddress(addressFromProfile);
        }
    }, [profileData]);

    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
    }

    async function proceedToCheckout(ev) {
        ev.preventDefault();

        // Show immediate non-dismissible toast for processing
        const processingToast = toast.loading('Processing your order...');

        setLoading2(true);

        try {
            const amount = subtotal + 5;
            const key = "rzp_test_Exl1ZI5DZDD1L7";


            const { data: { order } } = await axios.post("/api/checkout", {
                amount,
                address,
                cartProducts,
                deliveryOption,
                paymentMethod,

            });
            // console.log(`${process.env.NEXTAUTH_URL}/api/status/${order.id}`);
            const redirectUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/status/${order.id}`;

            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "The biryani adda",
                description: "Checkout",
                image: "https://avatars.githubusercontent.com/u/25058652?v=4",
                order_id: order.id,
                callback_url: redirectUrl,
                prefill: {
                    name: userName,
                    email: userEmail,
                    contact: address.phone
                },
                notes: {
                    "address": address
                },
                theme: {
                    "color": "#6d1717"
                },
                method: "upi" // Include this line to enable UPI as a payment method
            };

            const razor = new window.Razorpay(options);
            razor.on('ready', function () {
                // Update the processing toast message after Razorpay is ready
                // toast.loading('Payment processing...');
            });
            razor.open();

            // Show toast notification
            const promise = new Promise((resolve, reject) => {
                razor.on('payment.success', (response) => {
                    setLoading2(false);
                    resolve(response);
                    // toast.success('Payment successful! Redirecting...');
                });

                razor.on('payment.error', (error) => {
                    setLoading2(false);
                    reject(error);
                    toast.error('Payment failed. Please try again.');
                });
            });

            await toast.promise(promise, {
                loading: 'Processing payment...',
                success: 'Payment successful! Redirecting...',
                error: 'Payment failed. Please try again.',
            });

        } catch (error) {
            setLoading2(false);
            console.error("Error during checkout:", error);
            toast.error('Something went wrong. Please try again later.');
        }
    }

    // async function proceedToCheckout(ev) {
    //     ev.preventDefault();

    //     setLoading2(true);

    //     try {
    //         const amount = subtotal + 5;
    //         const key = "rzp_test_Exl1ZI5DZDD1L7";

    //         const { data: { order } } = await axios.post("http://localhost:3000/api/checkout", {
    //             amount,
    //         });

    //         const options = {
    //             key,
    //             amount: order.amount,
    //             currency: "INR",
    //             name: "The biryani adda",
    //             description: "Checkout",
    //             image: "https://avatars.githubusercontent.com/u/25058652?v=4",
    //             order_id: order.id,
    //             callback_url: `http://localhost:3000/api/status/${order.id}`,
    //             prefill: {
    //                 name: userName,
    //                 email: userEmail,
    //                 contact: address.phone
    //             },
    //             notes: {
    //                 "address": address
    //             },
    //             theme: {
    //                 "color": "#6d1717"
    //             }
    //         };

    //         const razor = new window.Razorpay(options);
    //         razor.open();

    //         // Show toast notification
    //         const promise = new Promise((resolve, reject) => {
    //             razor.on('payment.success', (response) => {
    //                 setLoading2(false);
    //                 resolve(response);
    //                 toast.success('Payment successful! Redirecting...');
    //             });

    //             razor.on('payment.error', (error) => {
    //                 setLoading2(false);
    //                 reject(error);
    //                 toast.error('Payment failed. Please try again.');
    //             });
    //         });

    //         await toast.promise(promise, {
    //             loading: 'Processing payment...',
    //             success: 'Payment successful! Redirecting...',
    //             error: 'Payment failed. Please try again.',
    //         });

    //     } catch (error) {
    //         setLoading2(false);
    //         console.error("Error during checkout:", error);
    //         toast.error('Something went wrong. Please try again later.');
    //     }
    // }




    //     const promise = new Promise((resolve, reject) => {
    //         fetch('/api/checkout', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 address,
    //                 cartProducts,
    //             }),
    //         }).then(async (response) => {
    //             setLoading2(false);
    //             if (response.ok) {
    //                 resolve();

    //                 window.location = await response.json();
    //             } else {
    //                 reject();
    //             }
    //         });
    //     });

    //     await toast.promise(promise, {
    //         loading: 'Preparing your order...',
    //         success: 'Redirecting to payment...',
    //         error: 'Something went wrong... Please try again later',
    //     })
    // }






    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'unauthenticated') {
        return <LoginPage2 />
    }

    if (!cartProducts) {
        return <Loader />;

    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Checkout" />
                <p className="mt-4">Your shopping cart is empty 😔</p>
            </section>
        );
    }


    return (
        <section className="pt-[100px] px-5 xl:px-10  xl:h-screen bg-cover bg-center bg-fixed" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80')`
        }}
        >

            <div className="text-center">
                <SectionHeaders mainHeader="Checkout" />
            </div>

            <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2 h-fit pb-5 ">
                <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto bg-white rounded-md shadow-xl">
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct
                            key={index}
                            product={product}
                            onRemove={removeCartProduct}
                        />
                    ))}
                    <div className="py-2 pr-16 flex justify-end items-center">
                        <div className="text-gray-500">
                            Subtotal:<br />
                            Delivery:<br />
                            Total:
                        </div>
                        <div className="font-semibold pl-2 text-right">
                            ${subtotal}<br />
                            $5<br />
                            ${subtotal + 5}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                    <h2 className="font-bold text-center">Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                        {Loading2 ? (<button type="submit" disabled>Processing... </button>) : (<button type="submit" className=" text-primary hover:bg-primarydark hover:text-y3 transition-colors duration-300 ">Pay ${subtotal + 5}</button>)}
                        {/* <button type="submit">Pay ${subtotal + 5}</button> */}
                    </form>
                </div>
            </div>
        </section>
    );
}
