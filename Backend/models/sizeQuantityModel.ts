import mongoose, { Schema, Document } from 'mongoose';

interface ISizeQuantity extends Document {
  size: string;
  quantity: number;  
}

const SizeQuantitySchema: Schema = new Schema({
  size: {
    type: String,
    required: true,
    enum: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

const SizeQuantity = mongoose.model<ISizeQuantity>('SizeQuantity', SizeQuantitySchema);

export default SizeQuantity;
export { ISizeQuantity };
