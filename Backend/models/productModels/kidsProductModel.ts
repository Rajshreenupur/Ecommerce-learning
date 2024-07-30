// models/admin.model.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IKidCategory extends Document {
    ProductName: string;
    ProductPrice: string;
    ProductUrl: string;
    Category: string;

}

const kidsProductSchema: Schema = new Schema({
Category:{
    type: String,default: "kid",
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

const KidCategory = mongoose.model<IKidCategory>('womensProduct', kidsProductSchema);

export default KidCategory;
