import mongoose, { Document, Schema, Types } from "mongoose";

const userCartSchema: Schema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
});

const UserCart = mongoose.model("Cart", userCartSchema);

export default UserCart;
