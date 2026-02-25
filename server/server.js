const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://admin:Whitestone123@cluster0.6adfpad.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// API routes
app.use("/api/orders", orderRoutes);

// Menu API
const menu = require("../client/src/data/menu");

app.get("/api/menu", (req, res) => {
  res.json(menu);
});


// ================= SERVE REACT =================

// Tell express to use React build folder
const clientPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientPath));

// Fix for React Router (/qr, /admin etc)
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});