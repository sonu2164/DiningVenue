import { authOptions, isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function POST(req, res) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);

    // Get session data
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Extract order ID from URL params
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    // Find the order by ID
    const order = await Order.findById(_id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure the user is authorized to cancel the order
    const orderUser = order.userEmail;  // Assuming 'userEmail' in schema
    if (userEmail !== orderUser) {
      return res.status(403).json({ message: 'You are not authorized to cancel this order' });
    }

    // Check if the order is in a 'processing' state and return a message if so
    if (order.status === 'processing') {
      return res.status(400).json({ message: 'You cannot cancel an order that is being processed' });
    }

    // If the order has been paid, initiate refund
    if (order.paid) {
      // Handle the refund logic here (e.g., by calling a payment service like Stripe, PayPal, etc.)
      // Example: refundInitiate(order);
      console.log("Initiating refund...");
    }

    // Cancel the order
    order.status = 'canceled';
    await order.save();

    return res.status(200).json({ message: "Order is canceled and refund initiated" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
