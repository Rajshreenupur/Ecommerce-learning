// models/admin.model.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IMenCategory extends Document {
    ProductName: string;
    ProductPrice: string;
    ProductUrl: string;
    Category: string;
}

const mensProductSchema: Schema = new Schema({
Category:{
    type: String,default: "men",
    required: true,
},
  ProductName: {
    type: String,
    required: true,
  },
  ProductPrice: {
    type: String,
    required: true,
  },
  ProductUrl: {
    type: String,
    required: true,
  },
});

const MenCategory = mongoose.model<IMenCategory>('mensProduct', mensProductSchema);

export default MenCategory;
