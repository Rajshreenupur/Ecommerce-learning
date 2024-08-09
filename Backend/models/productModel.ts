import mongoose, { Document, Schema } from 'mongoose';
import SizeQuantity, { ISizeQuantity } from './sizeQuantityModel';

const ProductSchema: Schema = new Schema({
  category: {
    type: String,
    required: true,
    enum: ['Mens', 'Womens', 'Kids'],
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
  },
  description: {
    type: String,
    required: true,
  },
  sizesQuantities: [SizeQuantity.schema]
});

interface IWomenCategory extends Document {
  productName: string;
  productPrice: string;
  productUrl: string;
  category: string;
  description: string;
  sizesQuantities: ISizeQuantity[]; 

}

const ProductCategory = mongoose.model<IWomenCategory>('Product', ProductSchema);

export default ProductCategory;
export { IWomenCategory };
