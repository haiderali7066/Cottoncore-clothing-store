"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  const randomRatings = Math.floor(Math.random() * 30) + 1; // 1 to 30

  return (
    <Link href={`/product/${product._id}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="cursor-pointer transform"
      >
        {/* Image Box */}
        <div className="relative w-full h-96 overflow-hidden bg-gray-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              unoptimized
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}

          {/* Hover “Buy / Add to Cart” Button */}
          <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="block w-full text-center bg-black text-white py-3 text-sm uppercase font-light tracking-widest hover:bg-purple-600 transition">
              Buy / Add to Cart
            </div>
          </div>
        </div>

        {/* Text Box */}
        <div className="text-center mt-4">
          <h3 className="text-md text-gray-900 uppercase font-light tracking-wide">
            {product.name}
          </h3>
          <div className="text-gray-700 text-md mt-1 uppercase font-light tracking-wide">
            Rs.{Number(product.price).toFixed(2)}
          </div>

          {/* 5 Stars Filled */}
          <div className="flex justify-center mt-2 items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className="text-yellow-400 fill-yellow-400"
              />
            ))}
            <span className="ml-2 text-sm text-gray-500 tracking-wide">
              ({randomRatings})
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
