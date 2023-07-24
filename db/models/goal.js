import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const goal = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  is_completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: String,
  },
  device_id: {
    type: String,
  },
  voucher: {
    type: mongoose.ObjectId
  },
  category: {type: String, required: true},
  created_at: {type: Date, default: new Date()},
  edited_at: {type: Date, default: new Date()}
});

module.exports =
  mongoose.models.Goal || mongoose.model("Goal", goal);
