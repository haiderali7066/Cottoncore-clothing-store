import Image from "next/image";
import Link from "next/link";
import HomeProducts from "@/components/HomeProducts";

export default function HomePage() {
  const categories = [
    {
      title: "Muslim",
      img: "https://i.pinimg.com/736x/0c/1a/d7/0c1ad796e8c3ead76ca571af046cf00b.jpg",
    },
    {
      title: "Trending",
      img: "https://img.joomcdn.net/3a214f374838fdc4a04ce65a9df042fd8e4e75cf_original.jpeg",
    },
    {
      title: "Fanbase",
      img: "https://images.meesho.com/images/products/330637171/1bxzr_512.jpg",
    },
    {
      title: "Motivational",
      img: "https://images-eu.ssl-images-amazon.com/images/I/61ziL3rbnrL._AC_UL600_SR600,600_.jpg",
    },
  ];

  const apparelCategories = [
    {
      title: "Hoodies",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0shf8Fh9XEwolWcH3x0YuT_vYj3Rsnrh7DA&s",
    },
    {
      title: "Sweatshirts",
      img: "https://surteez.com/cdn/shop/files/CASSETTING_827e3d49-647d-44bb-8825-a3b6d129fb56.jpg?v=1754064664&width=360",
    },
    {
      title: "Formal Dressing",
      img: "data:image/jpeg;base64,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",
    },
    {
      title: "Watches",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <main className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative bg-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 md:px-8 py-12 md:py-20 gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-wide">
              Elevate Your <span className="text-purple-600">Street Style</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg font-light text-gray-700 max-w-md mx-auto md:mx-0 leading-relaxed tracking-wide">
              Premium oversized and regular tees crafted for comfort, culture,
              and confidence.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link
                href="/products"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium tracking-wide hover:bg-purple-700 transition"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-black text-black rounded-lg font-medium tracking-wide hover:bg-gray-100 transition"
              >
                Explore
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <Image
              src="https://tshirtmalli.lk/cdn/shop/files/mkluffy-t-shirt-sri-lanka-black.webp?v=1742066475&width=533"
              alt="Hero Shirt"
              width={600}
              height={500}
              className="rounded-2xl shadow-lg object-cover w-[85%] sm:w-[70%] md:w-full"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center tracking-wide">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/products?category=${encodeURIComponent(cat.title)}`}
              className="relative group overflow-hidden rounded-2xl shadow hover:shadow-lg transition"
            >
              <Image
                src={cat.img}
                alt={cat.title}
                width={400}
                height={300}
                className="object-cover w-full h-40 sm:h-52 md:h-56 group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-base sm:text-lg font-semibold tracking-wide">
                  {cat.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-96 sm:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">
            Featured Products
          </h2>
        </div>
        <HomeProducts />
        <div className="flex justify-center items-center h-24">
          <Link
            href="/products"
            className="text-black text-xl font-medium flex items-center gap-1 hover:text-fuchsia-600 tracking-wide"
          >
            View All Products <span className="text-xl">→</span>
          </Link>
        </div>
      </section>

      {/* Apparel Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center tracking-wide">
          Apparel Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {apparelCategories.map((cat) => (
            <Link
              key={cat.title}
              href={`/products?category=${encodeURIComponent(cat.title)}`}
              className="relative group overflow-hidden rounded-3xl shadow hover:shadow-lg transition"
            >
              <Image
                src={cat.img}
                alt={cat.title}
                width={400}
                height={300}
                className="object-cover w-full h-40 sm:h-48 md:h-52 group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white text-base sm:text-lg font-semibold tracking-wide">
                  {cat.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
