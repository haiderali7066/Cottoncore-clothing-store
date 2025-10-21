// app/cart/page.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    setCart(raw ? JSON.parse(raw) : []);
  }, []);

  function updateQty(id, color, size, qty) {
    const next = cart.map((it) =>
      it._id === id && it.selectedColor === color && it.selectedSize === size
        ? { ...it, qty }
        : it
    );
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  function removeItem(id, color, size) {
    const next = cart.filter(
      (it) =>
        !(
          it._id === id &&
          it.selectedColor === color &&
          it.selectedSize === size
        )
    );
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  const total = cart.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-xl text-center shadow-sm">
          <p className="text-gray-600 mb-3">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-block px-5 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={`${item._id}-${item.selectedColor}-${item.selectedSize}`}
                className="bg-white rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row gap-6 items-center sm:items-start border border-gray-100 hover:shadow-md transition"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-28 h-28 rounded-xl object-cover"
                />
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        PKR {item.price.toLocaleString()}
                      </p>

                      {/* Color & Size */}
                      <div className="flex gap-4 mt-2 text-sm text-gray-700">
                        {item.selectedColor && (
                          <p>
                            <span className="font-medium">Color:</span>{" "}
                            {item.selectedColor}
                          </p>
                        )}
                        {item.selectedSize && (
                          <p>
                            <span className="font-medium">Size:</span>{" "}
                            {item.selectedSize}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() =>
                        removeItem(
                          item._id,
                          item.selectedColor,
                          item.selectedSize
                        )
                      }
                      className="text-red-500 text-sm font-medium hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() =>
                        updateQty(
                          item._id,
                          item.selectedColor,
                          item.selectedSize,
                          Math.max(1, item.qty - 1)
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.qty}
                    </span>
                    <button
                      onClick={() =>
                        updateQty(
                          item._id,
                          item.selectedColor,
                          item.selectedSize,
                          item.qty + 1
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-900">
                Total: PKR {total.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Cash on Delivery available at checkout
              </p>
            </div>
            <Link
              href="/checkout"
              className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
