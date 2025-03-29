// pages/api/cart/[email].js
// import connectDb from '../../../utils/db';
import { getCartItems, addToCart, clearCart } from '../../../../libs/cartutils';
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET(req) {
    try {

        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;
         mongoose.connect(process.env.MONGO_URL);
        const { status, data } = await getCartItems(userEmail);
        return Response.json({ status, data });
    } catch (error) {
        return Response.json(error);
    }
}

export async function POST(req) {
    try {
        const { email, cartItems } = await req.json();
       mongoose.connect(process.env.MONGO_URL); 
        const { status, data } = await addToCart(email, cartItems);
        return Response.json({ status, data });
    } catch (error) {
        console.log(error);
        return Response.json(error);

    }

}


// export async function PATCH(req, res) {
// mongoose.connect(process.env.MONGO_URL, {
// useNewUrlParser: true,
//     useUnifiedTopology: true,
      
//     });//     const { email } = req.json();
//     const { status, data } = await clearCart(email);
//     return Response.json(data);
// }
