// models/admin.model.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IWomenCategory extends Document {
  productName: string;
  productPrice: string;
  productUrl: string;
  category: string;
}

const ProductSchema: Schema = new Schema({
category:{
    type: String,
    required: true,
},
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  productUrl: {
    type: String,
    required: true,
  },
});

const ProductCategory = mongoose.model<IWomenCategory>('Product', ProductSchema);

export default ProductCategory;
