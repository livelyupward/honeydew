const mongoose = require('mongoose');
const { Schema } = mongoose;

const userListSchema = new Schema({
  listTitle: String,
  todos: Array,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

mongoose.model('todoLists', userListSchema);
