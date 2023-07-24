import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bucket = new Schema(
  {
    device_id: {
      type: String,
      required: true,
    },
    items: [
      {
        city: { type: String, required: true },
        todo: [
          {
            company: { type: String }, // company id
            is_completed: { type: Boolean, required: true, default: false },
            created_at: { type: Date, required: true, default: Date.now() },
            updated_at: { type: Date, required: true, default: Date.now() },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Bucket || mongoose.model("Bucket", bucket);
