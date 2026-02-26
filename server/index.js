const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS (Allow frontend access)
app.use(cors({
    origin: "https://whitestone-client.onrender.com",
    methods: ["GET", "POST", "PATCH"],
    credentials: true
}));

app.use(express.json());

// ✅ Connect to MongoDB (Use environment variable in production)
mongoose.connect(
    process.env.MONGO_URI || 
    "mongodb+srv://admin:Whitestone123@cluster0.6adfpad.mongodb.net/whitestone?retryWrites=true&w=majority"
)
.then(() => console.log("✅ MongoDB Atlas Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// ✅ Order Schema
const orderSchema = new mongoose.Schema({
    tableNumber: String,
    items: Array,
    totalAmount: Number,
    paymentMethod: String,
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

// ✅ Create Order (Customer)
app.post("/api/orders", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create order" });
    }
});

// ✅ Get All Orders (Owner)
app.get("/api/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// ✅ Update Order Status (Owner Accept)
app.patch("/api/orders/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update order" });
    }
});

// ✅ Health Check Route (very useful for Render)
app.get("/", (req, res) => {
    res.send("Whitestone Backend Running ✅");
});

// ✅ Start Server (IMPORTANT FIX)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});