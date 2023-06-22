import mongoose, { Schema } from 'mongoose';

const spaceSchema = new Schema({
  title: String,
});

export const Space = mongoose.model('Space', spaceSchema);
