import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

// 🧾 Create new order
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { name, phone, address, items, total } = body;

    if (!name || !phone || !address || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🧩 Convert cart items
    const products = items.map((it) => ({
      product: it._id || it.product?._id || it.product,
      quantity: it.qty || it.quantity || 1,
      selectedColor: it.selectedColor || "",
      selectedSize: it.selectedSize || "",
    }));

    // 🛍️ Create order (oid auto-generated in schema)
    const order = await Order.create({
      name,
      phone,
      address,
      products,
      total,
      status: "Pending",
    });

    const populated = await Order.findById(order._id).populate(
      "products.product"
    );

    return NextResponse.json({ success: true, order: populated });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}

// 📦 Get all orders
export async function GET() {
  await connectDB();
  try {
    const orders = await Order.find()
      .populate("products.product")
      .sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// ✏️ Update order status (Admin)
export async function PUT(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("products.product");

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("❌ Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
