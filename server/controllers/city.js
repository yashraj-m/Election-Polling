const Citys = require("../model/city");

const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const city = await Citys.create(req.body);

    return res.status(201).json({ city });
  } catch (e) {
    return res.status(500).json({ message: e.message }, { status: "Failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    let limit = 2;
    let page = req.query.page || 1;

    let skip = (page - 1) * limit;

    const total = await Citys.count();

    const totalpages = Math.ceil(total / limit);
    //console.log("totalpages:", totalpages);

    if (req.query.pollingstations) {
      let dec = req.query.pollingstations == "dec" ? -1 : 1;
      // console.log("req.query:", req.query);

      const citysort = await Citys.find({})
        .sort({ pollingstations: dec })
        .populate("districts")
        .skip(skip)
        .limit(limit)
        .exec();

      //console.log("citysort:", citysort);
      return res.status(200).json({ citysort, totalpages });
    }
    //console.log("page", page);

    const city = await Citys.find({})
      .populate("districts")
      .skip(skip)
      .limit(limit)
      .exec();

    return res.status(200).json({ city, totalpages });
  } catch (e) {
    return res.status(500).json({ message: e.message }, { status: "Failed" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const citybyid = await Citys.findById(req.params.id)
      .populate("districts")
      .exec();

    return res.status(200).json({ citybyid });
  } catch (e) {
    return res.status(500).json({ message: e.message }, { status: "Failed" });
  }
});

module.exports = router;
