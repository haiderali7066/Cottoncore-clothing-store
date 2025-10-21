// app/components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-400 py-12 mt-16 font-light tracking-wider text-gray-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 tracking-wider">
            Cotton<span className="text-purple-600">Core</span>
          </h2>
          <p className="text-sm leading-relaxed tracking-wide">
            Your go-to store for premium quality T-shirts and apparel. Trendy
            designs, great prices, fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-white transition-colors tracking-wide"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-white transition-colors tracking-wide"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="hover:text-white transition-colors tracking-wide"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors tracking-wide"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4 tracking-wider">
            Categories
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/products?category=Muslim"
                className="hover:text-white transition-colors tracking-wide"
              >
                Muslim
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=Motivational"
                className="hover:text-white transition-colors tracking-wide"
              >
                Motivational
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=Trending"
                className="hover:text-white transition-colors tracking-wide"
              >
                Trending
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=Fanbase"
                className="hover:text-white transition-colors tracking-wide"
              >
                Fanbase
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 tracking-wider">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm tracking-wide">
            <li>Email: support@cottoncore.com</li>
            <li>Phone: +92 325 6036838</li>
            <li>Instagram: @cottoncore.store</li>
          </ul>

          <div className="flex gap-5 mt-5 text-lg">
            <Link href="#" className="hover:text-white transition-colors">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <i className="fab fa-twitter"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm tracking-wide">
        © {new Date().getFullYear()} CottonCore. All rights reserved.
      </div>
    </footer>
  );
}
