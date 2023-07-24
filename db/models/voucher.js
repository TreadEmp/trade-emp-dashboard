import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const DISCOUNT_TYPES = {
  percentage: "percentage",
  fix: "fix",
};

const voucher = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  discount: {
    amount: { type: Number, default: 0 },
    type: { type: String, default: DISCOUNT_TYPES.percentage },
  },
  color: { type: String },
  barcode: { type: String },
  category: [
    {
      type: String,
    },
  ],
  start_date: { type: Date, default: new Date() },
  end_date: { type: Date, default: new Date() },
});

module.exports = mongoose.models.Voucher || mongoose.model("Voucher", voucher);
