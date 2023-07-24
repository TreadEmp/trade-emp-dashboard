import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const userDislikes = new Schema(
  {
    device_id: { type: String, required: true },
    companies: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.UserDislikes || mongoose.model("UserDislikes", userDislikes);
