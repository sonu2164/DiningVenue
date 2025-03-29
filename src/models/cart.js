import mongoose, { model, models, Schema } from "mongoose";
import MenuItemSchema from './MenuItem';

const CartItemSchema = new Schema({
    menuItem: { type: MenuItemSchema, required: true },
    selectedSize: { type: Number, required: true }, // Assuming selectedSize is a number
    selectedExtras: { type: [MenuItemSchema], default: [] },
    selectedFreeItems: { type: [MenuItemSchema], default: [] },
    quantity: { type: Number, default: 1 }, // Default quantity is 1
}, { timestamps: true });



const CartSchema = new Schema({
    email: { type: String, required: true, unique: true },
    cartItems: { type: [CartItemSchema], default: [] },
}, { timestamps: true });

const Cart = models?.Cart || model('Cart', CartSchema);
export default Cart;
