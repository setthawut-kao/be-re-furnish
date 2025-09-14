import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const createOrder = async (req, res) => {
  try {
    console.log("BE received data for new order:", req.body);
    const { products, shippingDetails, totalAmount } = req.body;
    const userId = req.user._id;

    const newOrder = new Order({
      user: userId,
      products,
      shippingDetails,
      totalAmount,
      status: "Processing",
      orderDate: new Date(),
    });

    await newOrder.save();

    await User.findByIdAndUpdate(userId, { $pull: { cart: {} } });

    res.status(201).json(newOrder);
  } catch (error) {
    console.log("Error in createOrder controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user._id,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
