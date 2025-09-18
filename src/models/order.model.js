import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        category: { type: String },
        description: { type: String },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingDetails: {
      recipientName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      address: { type: String, required: true },
    },
    status: {
      type: String,
      default: "Processing",
      required: true,
      enum: ["Processing"],
    },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
