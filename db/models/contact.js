import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contact = new Schema({
  device_id: { type: String },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: { type: String },
  gender: { type: String },
  birthday: { type: Date },
  address: { type: String },
  message: { type: String },
});

module.exports =
  mongoose.models.Contact || mongoose.model("Contact", contact);

