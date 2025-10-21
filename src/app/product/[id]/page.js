"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductPage({ params }) {
  // ✅ unwrap params Promise
  const { id } = React.use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const colors = ["Black", "White", "Gray"];
  const sizes = ["S", "M", "L"];

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products?id=${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading product...
      </div>
    );

  if (!product) return <div>Product not found.</div>;

  return (
    <section className="px-4 sm:px-6 md:px-10 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* 🖼 Product Image */}
        <div className="relative bg-gray-50 rounded-3xl shadow-md overflow-hidden">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="w-full h-[420px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* 🧾 Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {product.description || "No description provided for this product."}
          </p>

          <div className="text-3xl font-light text-gray-900">
            Rs.{product.price}
          </div>

          {/* 🎨 Color Selection */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Color</h3>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                    selectedColor === color
                      ? "border-black bg-gray-100"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* 📏 Size Selection */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Size</h3>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition ${
                    selectedSize === size
                      ? "border-black bg-gray-100"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 🔢 Quantity */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Quantity
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center border rounded-lg"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center border rounded-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* 🛒 Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href={`/checkout?product=${product._id}`}
              className="px-6 py-3 rounded-xl bg-black text-white text-center font-semibold hover:bg-purple-600 transition"
            >
              Buy Now
            </Link>

            <AddToCartButton
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
