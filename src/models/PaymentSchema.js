import { model, models, Schema } from "mongoose";


const paymentSchema = new Schema({
    razorpay_order_id: {
        type: String,
        required: true,

    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Payment = models?.Payment || model("Payment", paymentSchema);



