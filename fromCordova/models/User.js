const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  activeList: {
    type: Schema.Types.ObjectId,
    ref: 'todoLists',
    required: false,
  },
});

mongoose.model('users', UserSchema);
