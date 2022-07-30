const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
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
      default: [],
    },
  ],
  dueDate: {
    type: String,
    required: false,
    default: null,
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'lists',
  },
});

mongoose.model('todos', TodoSchema);
