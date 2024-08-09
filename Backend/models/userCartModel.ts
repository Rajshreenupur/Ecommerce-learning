import mongoose, { Document, Schema, Types } from "mongoose";

interface ICartProduct {
  productId: Types.ObjectId;
  quantity: number;
}

interface IUserCart extends Document {
  userId: Types.ObjectId;
  products: ICartProduct[];
}

const userCartSchema: Schema = new Schema<IUserCart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const UserCart = mongoose.model<IUserCart>("Cart", userCartSchema);

export default UserCart;
