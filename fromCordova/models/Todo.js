const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comments',
    },
  ],
  dueDate: {
    type: String,
    required: false,
    default: null,
  },
});

mongoose.model('todos', TodoSchema);
