"use client"
import React, { useState } from 'react';
import { QRCode } from 'react-qr-code';

const Page = () => {
    const [qr, setQr] = useState("");

    const fetchQrCode = async () => {
        try {
            const response = await fetch('https://wbnoti.onrender.com/');
            if (!response.ok) {
                throw new Error('Failed to fetch QR code');
            }
            const { qr } = await response.json();

            setQr(qr);
        } catch (error) {
            console.error(error);
        }
    };
    if (qr === "2") {
        return "Client is ready!"
    }

    return (
        <div>
            <h1>QR Code</h1>
            <button onClick={fetchQrCode}>Fetch QR Code</button>

            {qr && <QRCode value={qr} />}
        </div>
    );
};

export default Page;
