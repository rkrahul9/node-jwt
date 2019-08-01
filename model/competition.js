const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    venue: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: String, required: true },
    entryFee: { type: Number, required: true }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Competition = mongoose.model("Competition", competitionSchema);

module.exports = Competition;
