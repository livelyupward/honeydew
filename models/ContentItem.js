import mongoose, { Schema } from 'mongoose';

const contentItemSchema = new mongoose.Schema({
  date: { type: Date, required: false },
  checked: { type: Boolean, required: false },
  type: String,
  text: String,
  items: [{ type: String, required: false }],
  spaceId: { type: Schema.Types.ObjectId, ref: 'Space' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const ContentItem = mongoose.model('ContentItem', contentItemSchema);
