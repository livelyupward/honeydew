const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
  todo: {
    type: Schema.Types.ObjectId,
    ref: 'todos',
  },
});

mongoose.model('comments', CommentSchema);
