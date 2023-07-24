import mongoose from "mongoose";
const Schema = mongoose.Schema;

const company = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tags: [
    {
      label: { type: String },
      url: { type: String },
    },
  ],
  url: {
    type: String,
    required: true,
  },
  categoryOne: {
    type: String,
    default: null,
  },
  categoryTwo: {
    type: String,
    default: null,
  },
  categoryThree: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    default: null,
  },
  postalCode: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  logo: {
    type: String,
    default: null,
  },
  formattedLocations: [
    {
      address: { type: String, default: "" },
      lat: { type: Number },
      lng: { type: Number },
      id: { type: Number },
    },
  ],
  locations: [
    {
      type: { type: String, default: "Point" },
      coordinates: [],
    },
  ],
  vouchers: [
    {
      type: String,
    },
  ],
});

company.index({ locations: "2dsphere" });

mongoose.models = {};

module.exports =
  mongoose.models.Company || mongoose.model("Company", company);
