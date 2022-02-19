const Districts = require("../model/district");

const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const dist = await Districts.create(req.body);

    return res.status(201).json({ dist });
  } catch (e) {
    return res.status(500).json({ message: e.message }, { status: "Failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const dist = await Districts.find({}).lean().exec();

    return res.status(200).json({ dist });
  } catch (e) {
    return res.status(500).json({ message: e.message }, { status: "Failed" });
  }
});

module.exports = router;
