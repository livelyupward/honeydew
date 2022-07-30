const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  listTitle: String,
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'todos',
    },
  ],
  category: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

mongoose.model('lists', ListSchema);
