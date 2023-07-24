import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userCoupons = new Schema(
  {
    device_id: { type: String, required: true },
    coupon_details: [
      {
        company_id: { type: String, required: true },
        coupons: [
          {
            type: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.UserCoupons || mongoose.model("UserCoupons", userCoupons);
