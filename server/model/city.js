const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
  {
    cityname: { type: String, required: true },
    cityimage: { type: String, required: true },
    districts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "district",
      },
    ],
    pollingstations: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("city", CitySchema);
