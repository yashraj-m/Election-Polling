const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");

const CityController = require("./controllers/city");
const DistController = require("./controllers/district");
app.use(cors());
app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/palcementassignment1");
};

app.use("/dist", DistController);

app.use("/city", CityController);

app.use("/", async (req, res) => {
  return res.send("Hello full stack");
});

app.listen(2100, async function () {
  await connect();
  console.log("listening on port 2100");
});
