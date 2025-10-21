"use client";
import { useState } from "react";

export default function AddToCartButton({
  product,
  selectedColor,
  selectedSize,
  quantity,
}) {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const raw = localStorage.getItem("cart");
    const cart = raw ? JSON.parse(raw) : [];

    const existing = cart.find(
      (p) =>
        p._id === product._id &&
        p.selectedColor === selectedColor &&
        p.selectedSize === selectedSize
    );

    if (existing) {
      existing.qty += quantity;
    } else {
      cart.push({
        ...product,
        selectedColor,
        selectedSize,
        qty: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={addToCart}
      disabled={!selectedColor || !selectedSize}
      className={`px-4 py-2 rounded-md border transition ${
        added
          ? "bg-green-600 text-white"
          : !selectedColor || !selectedSize
          ? "opacity-60 cursor-not-allowed"
          : "hover:bg-gray-100"
      }`}
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
