// models/admin.model.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IAdmin extends Document {
  email: string;
  password: string;
}

const adminLoginSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model<IAdmin>('Admin', adminLoginSchema);

export default Admin;
