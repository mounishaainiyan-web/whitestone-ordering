const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* ================================
   MongoDB Connection
================================ */
mongoose.connect("mongodb+srv://admin:Whitestone123@cluster0.6adfpad.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.error(err));


/* ================================
   API Routes
================================ */
app.use("/api/orders", orderRoutes);

const menu = require("../client/src/data/menu");

app.get("/api/menu", (req, res) => {
  res.json(menu);
});


/* ================================
   Serve React Frontend
================================ */

// absolute path to client/dist
const clientPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientPath));

// VERY IMPORTANT FIX
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});


/* ================================
   Start Server
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});