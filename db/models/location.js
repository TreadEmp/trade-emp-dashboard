import mongoose from "mongoose";
const Schema = mongoose.Schema;

const location = new Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  location: [
    {
      type: { type: String, default: "Point" },
      coordinates: [],
    },
  ],
});

location.index({ "location.coordinates": "2dsphere" });

module.exports =
  mongoose.models.Location || mongoose.model("Location", location);
