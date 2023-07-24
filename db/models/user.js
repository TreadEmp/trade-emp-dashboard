import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: null
  },
});

mongoose.models = {};

module.exports =
  mongoose.models.User || mongoose.model("User", user);
