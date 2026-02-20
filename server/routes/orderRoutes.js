const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


// ===============================
// CREATE NEW ORDER
// ===============================
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order({
      tableNumber: req.body.tableNumber,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      paymentMethod: req.body.paymentMethod,
      status: "Pending"
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message
    });
  }
});


// ===============================
// GET ALL ORDERS (Admin)
// ===============================
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message
    });
  }
});


// ===============================
// UPDATE ORDER STATUS (Accept)
// ===============================
router.patch("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({
      message: "Error updating order",
      error: error.message
    });
  }
});


module.exports = router;
