const mongoose = require("mongoose");

const wagerSlip = new mongoose.Schema(
  {
    competitionId: { type: String, required: true, ref: 'Competition' },
    couponPrice: { type: Number, required: true }
  }
);

const wagerSlipSchema = new mongoose.Schema(
  {
    wagerSlips: [wagerSlip]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const WagerSlip = mongoose.model("WagerSlip", wagerSlipSchema);

module.exports = WagerSlip;
