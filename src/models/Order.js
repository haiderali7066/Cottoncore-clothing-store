import mongoose from "mongoose";
import crypto from "crypto";

const OrderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 },
    selectedColor: { type: String },
    selectedSize: { type: String },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    // 🆕 Custom readable order ID
    oid: { type: String, unique: true },

    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    products: [OrderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

// ✅ Auto-generate readable OID before saving
OrderSchema.pre("save", function (next) {
  if (!this.oid) {
    const randomCode = crypto.randomBytes(3).toString("hex").toUpperCase(); // 6-char code
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // e.g. 251020
    this.oid = `CC-${randomCode}`; // e.g. CC-251020-A1B2C3
  }
  next();
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
