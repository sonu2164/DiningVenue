"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';

const PaymentSuccess = () => {
    const searchParams = useSearchParams();
    const referenceNum = searchParams.get('reference');

    return (
        <div className="max-w-md mx-auto m-10 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-green-600 text-2xl mb-4">Order Successful</h1>
            <p className="text-gray-700 text-lg mb-2">
                Your order has been successfully processed.
            </p>
            <p className="text-gray-700 text-lg">
                Reference Number: <strong>{referenceNum}</strong>
            </p>
        </div>
    );
};

export default PaymentSuccess;
