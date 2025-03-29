// path/to/your/payment-handler.js

const crypto = require('crypto');
const axios = require('axios');
// const { salt_key, merchant_id } = require('./secret');

// async function newPayment(req, res) {
//     try {
//         const merchantTransactionId = req.body.transactionId;
//         const data = {
//             merchantId: PGTESTPAYUAT,
//             merchantTransactionId: merchantTransactionId,
//             merchantemail: req.body.MUID,
//             name: req.body.name,
//             amount: req.body.amount * 100,
//             redirectUrl: `http://localhost:3000/api/status/${merchantTransactionId}`,
//             redirectMode: 'POST',
//             mobileNumber: req.body.number,
//             paymentInstrument: {
//                 type: 'PAY_PAGE'
//             }
//         };
//         const payload = JSON.stringify(data);

//         const payloadMain = Buffer.from(payload).toString('base64');
//         const keyIndex = 1;
//         const string = payloadMain + '/pg/v1/pay' + '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
//         const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//         const checksum = sha256 + '###' + keyIndex;

//         const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
//         const options = {
//             method: 'POST',
//             url: prod_URL,
//             headers: {
//                 accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 'X-VERIFY': checksum
//             },
//             data: {
//                 request: payloadMain
//             }
//         };

//         const response = await axios.request(options);
//         console.log(response.data);
//         return res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
//     } catch (error) {
//         res.status(500).send({
//             message: error.message,
//             success: false
//         });
//     }
// }

export default async function checkStatus(req, res) {
    try {
        const merchantTransactionId = req.body.transactionId;
        const merchantId = req.body.merchantId;

        const keyIndex = 1;
        const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const options = {
            method: 'GET',
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': `${merchantId}`
            }
        };

        // CHECK PAYMENT STATUS
        const response = await axios.request(options);

        if (response.data.success === true) {
            const url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/success`;
            return res.redirect(url);
        } else {
            const url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/failure`;
            return res.redirect(url);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message,
            success: false
        });
    }
}


