const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema(
  {
    taluk: { type: String, required: true },
    distimage: { type: String, required: true },
    distpollingstations: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("district", DistrictSchema);
