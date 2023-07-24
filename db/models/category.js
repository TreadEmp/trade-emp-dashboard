import mongoose from "mongoose";
const Schema = mongoose.Schema;

const category = new Schema({
  name: { type: String },
  image: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
});

module.exports =
  mongoose.models.Category || mongoose.model("Category", category);
