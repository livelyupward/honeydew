import mongoose, { Schema } from 'mongoose';

const spaceSchema = new Schema({
  title: String,
  content: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ContentItem',
    },
  ],
});

export const Space = mongoose.model('Space', spaceSchema);
