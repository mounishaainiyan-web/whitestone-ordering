const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// API routes
app.use("/api/orders", orderRoutes);


// Menu route
const menu = require("../client/src/data/menu");

app.get("/api/menu", (req, res) => {
  res.json(menu);
});


// ✅ Serve React frontend build
app.use(express.static(path.join(__dirname, "../client/dist")));


// ✅ Fix React routing (IMPORTANT)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});


// MongoDB connection
mongoose.connect("mongodb+srv://admin:Whitestone123@cluster0.6adfpad.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.error(err));


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});