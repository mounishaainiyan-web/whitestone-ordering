const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

mongoose.connect("mongodb+srv://admin:Whitestone123@cluster0.6adfpad.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.error(err));
  app.get("/", (req, res) => {
  res.send("Whitestone Ordering Server is Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
