
// import crypto from 'crypto';
// import axios from 'axios';

// export async function POST(req) {
//     try {

//         const { transactionId: merchantTransactionId, merchantId } = req.json();


//         const keyIndex = 1;
//         const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
//         const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//         const checksum = sha256 + '###' + keyIndex;
//         console.log("status", string);
//         const options = {
//             method: 'GET',
//             url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
//             headers: {
//                 accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 'X-VERIFY': checksum,
//                 'X-MERCHANT-ID': `${merchantId}`
//             }
//         };
//         console.log("status", options);


//         // console.log(`https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`);
//         // CHECK PAYMENT STATUS


//         const response = axios.request(options);

//         if (response.data.success == true) {
//             // update database with staus paid

//             // send messsage to user
//             const userPhoneNumber = 'whatsapp:+919935067283';
//             const confirmationMessage = 'Your order has been successfully made. We will process it shortly.';
//             await sendWhatsAppMessage(userPhoneNumber, confirmationMessage);
//             // send message to owner

//             const ownerPhoneNumber = 'whatsapp:+919839019095'; // Replace with the owner's WhatsApp number
//             const confirmationLink = `http://localhost:3000/api/confirm-order?id=${orderId}`;
//             const messageBody = `New order received!\n\nOrder ID: ${orderId}\n\nClick the link to confirm: ${confirmationLink}`;

//             await sendWhatsAppMessage(ownerPhoneNumber, messageBody);


//             const url = `http://localhost:3000/success`
//             return Response.redirect(url)
//         }
//         const url = `http://localhost:3000/failure`
//         return Response.redirect(url)





//     } catch (error) {
//         console.error(error);
//         return Response.status(500).send({
//             message: error.message,
//             success: false
//         });
//     }

// }



import crypto from 'crypto';

import { Payment } from '../../../../models/PaymentSchema';
import mongoose from 'mongoose';
import { Order } from '../../../../models/Order'

export async function POST(req) {
    try {
        const formData = await req.formData();
        const razorpay_order_id = formData.get('razorpay_order_id');
        const razorpay_payment_id = formData.get('razorpay_payment_id');
        const razorpay_signature = formData.get('razorpay_signature');


        mongoose.connect(process.env.MONGO_URL);
        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', 'vFo01Qka8RGsbLAxcy4d9CGJ')
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Database logic goes here
            await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            // update order

            const updatedOrder = await Order.findOneAndUpdate(
                { orderId: razorpay_order_id },
                { $set: { paid: true } },
                { new: true }  // This option returns the modified document
            );

            try {
                const orderdata = {
                    number: 9935067283,
                    orderid: razorpay_order_id,
                    orderdetails: updatedOrder,
                };

                // to send wb message 

                const response = await fetch('https://wbnoti.onrender.com/place-order', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedOrder)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // If you want to do something with the response, you can handle it here
                const responseData = await response.json();
                console.log(responseData);
            } catch (error) {
                console.error(error);
            }


            // Redirect to the success page
            return Response.redirect(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/success?reference=${razorpay_payment_id}`);
        } else {
            return Response.redirect(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/failure?reference=${razorpay_payment_id}`
            );
        }
    } catch (error) {
        console.error(error);
        return Response.json({
            status: 500,
            message: error.message,
            success: false,
        });
    }
}
