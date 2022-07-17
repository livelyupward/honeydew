const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
  listTitle: String,
  todos: Array,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

mongoose.model('todoLists', TodoListSchema);
