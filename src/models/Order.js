import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
  userEmail: String,
  phone: String,
  streetAddress: String,
  postalCode: String,
  city: String,
  country: String,
  cartProducts: Object,
  paid: { type: Boolean, default: false },
  paymentMethod: String,
  deliveryOption: String,
  orderId: String,
  amount: Number,
  status: {
    type: String,
    enum: ['order_placed', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'canceled', 'failed'],
    default: 'order_placed'
  },
}, { timestamps: true });

export const Order = models?.Order || model('Order', OrderSchema);