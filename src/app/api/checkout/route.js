
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MenuItem } from "@/models/MenuItem";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { instance } from '../route'




export async function POST(req, res) {


  const { address, cartProducts, amount, paymentMethod, deliveryOption } = await req.json();



  mongoose.connect(process.env.MONGO_URL);
  // mongoose.connect(process.env.MONGO_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,

  // });

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;




  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
    paymentMethod,
    deliveryOption,
    orderId: order.id,
    amount,

  });

  return Response.json({
    success: true,
    order,
  });
}
