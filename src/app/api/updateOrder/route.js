import { getServerSession } from "next-auth";
import mongoose from 'mongoose';
import { Order } from '@/models/Order';
import { authOptions, isAdmin } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req) {
    try {
        const { orderId, status } = await req.json();

        // Ensure database connection
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URL);
        }

        // ✅ Await isAdmin() since it's an async function
        const admin = await isAdmin();
        if (!admin) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // ✅ Find and update order
        const order = await Order.findById(orderId);
        if (!order) {
            return Response.json({ message: "Order not found" }, { status: 404 });
        }

        order.status = status;
        await order.save();

        return Response.json({ message: "Order status updated successfully" });

    } catch (error) {
        console.error("Error updating order:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
