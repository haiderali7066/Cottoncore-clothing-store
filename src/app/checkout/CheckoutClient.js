"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CheckoutClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [placingOrder, setPlacingOrder] = useState(false);

  // Load cart or single product
  useEffect(() => {
    async function loadData() {
      if (productId) {
        try {
          const res = await fetch(`/api/products?id=${productId}`);
          const data = await res.json();
          if (data && data._id) {
            setCart([{ ...data, qty: 1 }]);
            setTotal(data.price);
          } else {
            alert("Product not found");
          }
        } catch {
          alert("Failed to fetch product");
        }
      } else {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(savedCart);
        setTotal(savedCart.reduce((acc, i) => acc + i.price * (i.qty || 1), 0));
      }
      setLoading(false);
    }
    loadData();
  }, [productId]);

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address)
      return alert("Please fill all fields");
    if (!cart.length) return alert("No items to order");

    setPlacingOrder(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: cart, total }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.order?._id) {
        const order = data.order;
        localStorage.setItem(
          "lastOrder",
          JSON.stringify({
            oid: order.oid || order._id,
            name: order.name,
            phone: order.phone,
            address: order.address,
            items: order.products || cart,
            total: order.total,
            status: order.status || "Pending",
            date: new Date(order.createdAt).toLocaleString(),
          })
        );
        localStorage.removeItem("cart");
        router.push("/order-success");
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-700">Loading checkout...</div>
    );

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        Checkout — Cash on Delivery
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Order Summary */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">No items in your cart.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={`${item._id}-${item.selectedColor || ""}-${
                    item.selectedSize || ""
                  }`}
                  className="flex items-center gap-4 border-b pb-4 last:border-none"
                >
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      PKR {item.price.toLocaleString()}
                    </p>
                    <div className="flex gap-4 text-xs text-gray-600 mt-1">
                      {item.selectedColor && (
                        <span>Color: {item.selectedColor}</span>
                      )}
                      {item.selectedSize && (
                        <span>Size: {item.selectedSize}</span>
                      )}
                    </div>
                    <p className="text-xs mt-1 text-gray-700">
                      Qty: {item.qty || 1}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 border-t pt-4 flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>PKR {total.toLocaleString()}</span>
          </div>
        </div>

        {/* Customer Form */}
        <form
          onSubmit={placeOrder}
          className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-5"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Shipping Details
          </h2>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Full Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Phone
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Address
            </label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={placingOrder}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition"
          >
            {placingOrder ? "Placing Order..." : "Place Order (COD)"}
          </button>
        </form>
      </div>
    </section>
  );
}
