'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { dbTimeForHuman } from "@/libs/datetime";
import Link from "next/link";
import { useEffect, useState } from "react";
import FeedbackForm from '@/components/FeedbackForm'
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from "next-auth/react";
// import { isAdmin } from "@/app/api/auth/[...nextauth]/route";

export default function FeedbackPage() {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const { loading, data: profile } = useProfile();
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
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
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status]);



    useEffect(() => {
        fetchOrders();
    }, []);

    function fetchOrders() {
        setLoadingOrders(true);
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
                setLoadingOrders(false);
            })
        })
    }

    const handleOpenFeedbackForm = (orderId) => {
        setSelectedOrderId(orderId);
        setShowFeedbackForm(!showFeedbackForm);
    };

    const handleCloseFeedbackForm = () => {
        setShowFeedbackForm(false);
    };

    const handleFeedbackSubmit = async ({ orderId, feedback }) => {
        try {

            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, feedback }),
            });

            if (response.ok) {
                toast.success('Feedback submitted successfully!', {
                    // Use an ID to ensure only one toast is displayed
                    id: 'feedback-toast',
                });
            }
        } catch (error) {

            toast.error('An error occurred while submitting feedback.');
        }




    }

    // if (isAdmin) {
    //     const res = fetch("/api/feedback", {
    //         mathod: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },


    //     });

    //     return (
    //         <div>
    //             <h1>hello</h1>
    //             {res?.map((feedback, index) => {
    //                 <h1 key={index}>feedabck componenet</h1>
    //             })}
    //         </div>
    //     )
    // } 

    return (
        <section className="mt-8 max-w-2xl mx-auto">

            <div className="mt-8">
                {loadingOrders && (
                    <div>Loading orders...</div>
                )}
                {orders?.length > 0 && orders.map(order => (
                    <div
                        key={order._id}
                        className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
                        <div className="grow flex flex-col md:flex-row items-center gap-6">
                            <div>
                                <div className={
                                    (order.paid ? 'bg-green-500' : 'bg-red-400')
                                    + ' p-2 rounded-md text-white w-24 text-center'
                                }>
                                    {order.paid ? 'Paid' : 'Not paid'}
                                </div>
                            </div>
                            <div className="grow">
                                <div className="flex gap-2 items-center mb-1">
                                    <div className="grow">{order.userEmail}</div>
                                    <div className="text-gray-500 text-sm">{dbTimeForHuman(order.createdAt)}</div>
                                </div>
                                <div className="text-gray-500 text-xs">
                                    {order.cartProducts.map(p => p.name).join(', ')}
                                </div>
                            </div>
                        </div>
                        <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                            <button onClick={() => handleOpenFeedbackForm(order._id)} className="button">
                                Give feedback
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {showFeedbackForm && (
                <FeedbackForm
                    orderId={selectedOrderId}
                    onClose={handleCloseFeedbackForm}
                    onSubmit={handleFeedbackSubmit}
                />
            )}
            {/* Toast container */}
            <Toaster position="top-right" />
        </section>
    );
}