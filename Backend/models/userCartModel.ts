import mongoose, { Document, Schema, Types } from "mongoose";

// Define an interface for the product in the cart
interface ICartProduct {
  productId: Types.ObjectId;
  quantity: number;
}

// Define an interface for the UserCart document
interface IUserCart extends Document {
  userId: Types.ObjectId;
  products: ICartProduct[];
}

// Define the UserCart schema
const userCartSchema: Schema = new Schema<IUserCart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

// Create the UserCart model
const UserCart = mongoose.model<IUserCart>("Cart", userCartSchema);

export default UserCart;
