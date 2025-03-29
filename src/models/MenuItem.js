import mongoose, { model, models, Schema } from "mongoose";



const MenuItemSchema = new Schema({
  image: { type: String },
  name: { type: String },
  description: { type: String },
  category: { type: mongoose.Types.ObjectId },
  basePrice: { type: Number },

}, { timestamps: true });


export default MenuItemSchema;
export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);