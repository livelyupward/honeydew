import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  activeSpace: { type: Schema.Types.ObjectId, required: false },
});

export const User = mongoose.model('User', userSchema);
