const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://admin:Whitestone123@cluster0.6adfpad.mongodb.net/whitestone?retryWrites=true&w=majority")
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

// 🔹 Order Schema
const orderSchema = new mongoose.Schema({
    items: Array,
    totalAmount: Number,
    status: {
        type: String,
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);

// 🔹 Create Order (Customer)
app.post("/api/orders", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
});

// 🔹 Get All Orders (Owner)
app.get("/api/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// 🔹 Update Order Status (Owner Accept/Reject)
app.patch("/api/orders/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: "Failed to update order" });
    }
});

// 🔹 Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
