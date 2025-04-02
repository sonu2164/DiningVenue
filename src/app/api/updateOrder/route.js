import { getServerSession, isAdmin } from "next-auth";
import mongoose from 'mongoose';
import { Order } from '@/models/Order';
import { MenuItem } from '@/models/MenuItem';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, res) {


    const { orderId, new_status } = await req.json();

    mongoose.connect(process.env.MONGO_URL);


    // const session = await getServerSession(authOptions);
    //   const userEmail = session?.user?.email;
    const admin = isAdmin();

    if (admin) {
        const order = await Order.findById(orderId);
        if (order) {
            order.status = new_status;
            await order.save();
            Response.json({ message: "Order status updated successfully" });
        } else {
            Response.json({ message: "Order not found" });
        }


    }
    else {
        return Response.status(401).json({ error: 'Unauthorized' });
    }







}
