const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

mongoose.connect("mongodb+srv://admin:Whitestone123@cluster0.6adfpad.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.error(err));
const menu = require("./menu");

app.get("/api/menu", (req, res) => {
  res.json(menu);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});