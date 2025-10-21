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
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placingOrder, setPlacingOrder] = useState(false);

  // Load cart or product
  useEffect(() => {
    async function loadData() {
      if (productId) {
        const res = await fetch(`/api/products?id=${productId}`);
        const data = await res.json();
        if (data && data._id) {
          setCart([{ ...data, qty: 1 }]);
          setTotal(data.price);
        } else alert("Product not found");
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
    if (!form.firstName || !form.lastName || !form.address || !form.phone)
      return alert("Please fill all required fields");

    setPlacingOrder(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          items: cart,
          total,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.order?._id) {
        localStorage.removeItem("cart");
        router.push("/order-success");
      } else alert(data.error || "Failed to place order");
    } catch {
      alert("Error placing order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-700">Loading checkout...</div>
    );

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Checkout
      </h1>

      <form onSubmit={placeOrder} className="grid md:grid-cols-2 gap-8">
        {/* Delivery Info */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">First name</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Last name</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Address</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">
              Apartment, suite, etc. (optional)
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Optional"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">City</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Postal code</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Phone</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Payment + Summary */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment</h2>

          <div className="space-y-3">
            {[
              { id: "cod", label: "Cash on Delivery (COD)" },
              {
                id: "payfast",
                label: "PAYFAST (Pay via Debit/Credit/Wallet/Bank Account)",
              },
              { id: "bank", label: "Bank Deposit" },
            ].map((method) => (
              <label
                key={method.id}
                className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-black transition"
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                />
                <span className="text-gray-800 text-sm">{method.label}</span>
              </label>
            ))}
          </div>

          {/* Conditional Info */}
          {paymentMethod === "payfast" && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 mt-3">
              <p className="font-semibold mb-1">Accepted:</p>
              <p className="mb-2">Visa • MasterCard • UnionPay</p>
              <p className="text-gray-600">
                After clicking “Pay now”, you will be redirected to PAYFAST to
                complete your purchase securely.
              </p>
            </div>
          )}

          {paymentMethod === "bank" && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 mt-3">
              <p className="font-semibold">Bank Name:</p>
              <p>Meezan Bank LTD</p>
              <p className="font-semibold mt-2">Account No:</p>
              <p>01250107720102</p>
              <p className="font-semibold mt-2">IBAN No:</p>
              <p>PK68MEZN0001250107720102</p>
              <p className="font-semibold mt-2">Account Title:</p>
              <p>Cottoncore</p>
              <p className="mt-3 text-gray-600">
                After Transaction Payment, Please share a Screenshot of the
                Payment with ORDER ID at{" "}
                <span className="font-medium">help@surteez.com</span> OR
                WhatsApp at <span className="font-medium">0319-0328248</span>.
              </p>
            </div>
          )}

          <div className="border-t pt-4 flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>PKR {total.toLocaleString()}</span>
          </div>

          <button
            type="submit"
            disabled={placingOrder}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition mt-4"
          >
            {placingOrder
              ? "Processing..."
              : paymentMethod === "payfast"
              ? "Pay Now"
              : "Place Order"}
          </button>
        </div>
      </form>
    </section>
  );
}
