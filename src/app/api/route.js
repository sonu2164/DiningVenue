import Razorpay from "razorpay";


export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});


// mongoose.connect(process.env.MONGO_URL);