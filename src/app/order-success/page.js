"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("lastOrder");
    if (data) setOrder(JSON.parse(data));
  }, []);

  if (!order) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="bg-white shadow-md rounded-2xl p-8 text-center max-w-sm w-full border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Order details not found
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Make sure you just placed an order.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl font-medium text-sm w-full"
          >
            Go Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
      {/* ✅ Success Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center bg-purple-500 rounded-full h-24 w-24 m-auto text-white text-5xl mb-3 font-bold">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Order Placed Successfully!
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Thank you for shopping with us.
        </p>
      </div>

      {/* ✅ Order Slip */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm md:max-w-md lg:max-w-lg border border-gray-200 text-sm text-gray-700 font-mono">
        <div className="text-center border-b border-dashed pb-3 mb-3">
          <p className="font-semibold text-gray-900">ORDER SLIP</p>
          <p className="text-xs text-gray-500 mt-1">
            CottonCore — Premium Streetwear 🇵🇰
          </p>
        </div>

        {/* ✅ Show correct OID */}
        <p>
          <span className="font-semibold">Order ID:</span>{" "}
          {order.orderId || order.oid || "—"}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          {order.status || "Pending"}
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {order.date || new Date().toLocaleString()}
        </p>

        <div className="border-t border-dashed my-3"></div>

        <p>
          <span className="font-semibold">Name:</span> {order.name || "—"}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {order.phone || "—"}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {order.address || "—"}
        </p>

        <div className="border-t border-dashed my-3"></div>

        <p className="font-semibold text-gray-900 mb-2">Items Ordered:</p>

        {Array.isArray(order.items) && order.items.length > 0 ? (
          <ul className="space-y-2">
            {order.items.map((item, i) => (
              <li
                key={i}
                className="border-b border-dashed pb-2 last:border-none"
              >
                <p className="font-medium">
                  {item.product?.name || item.name || "Unnamed Item"}
                </p>
                <p className="text-xs text-gray-600">
                  {item.selectedColor ? `Color: ${item.selectedColor} ` : ""}
                  {item.selectedSize ? `Size: ${item.selectedSize} ` : ""}
                  Qty: {item.quantity || item.qty || 1}
                </p>
                <p className="text-right font-semibold">
                  PKR{" "}
                  {item.product?.price
                    ? item.product.price.toLocaleString()
                    : item.price?.toLocaleString() || "0"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-500">No items found.</p>
        )}

        <div className="border-t border-dashed mt-3 pt-2 flex justify-between font-semibold text-gray-900">
          <span>Total</span>
          <span>PKR {order.total ? order.total.toLocaleString() : "0"}</span>
        </div>
      </div>

      {/* ✅ Separate Button */}
      <Link
        href="/"
        className="mt-6 bg-black text-white text-center px-8 py-4 rounded-xl font-semibold hover:bg-purple-600 transition text-sm mx-auto"
      >
        Go Home
      </Link>
    </section>
  );
}
