import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import products from "../data/products";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { addToCart, cartCount } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const isVisible =
        product.active !== false &&
        product.deleted !== true &&
        product.available !== false &&
        product.quantity > 0;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return isVisible && matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f8faf4]">
      <Navbar search={search} setSearch={setSearch} cartCount={cartCount} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-green-800 to-green-600 px-6 py-10 text-white sm:px-10 sm:py-14">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider">
              Freshness delivered daily
            </span>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Nature's best,
              <br />
              straight to your table.
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-green-50 sm:text-base">
              Shop fresh fruits and vegetables selected to bring goodness,
              flavor, and freshness to your everyday life.
            </p>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-7 rounded-xl bg-white px-6 py-3 font-semibold text-green-800 transition hover:bg-green-50"
            >
              Explore products →
            </button>
          </div>

          <div className="pointer-events-none absolute -right-8 -top-12 hidden text-[190px] opacity-20 md:block lg:text-[240px]">
            🍊
          </div>
          <div className="pointer-events-none absolute bottom-0 right-32 hidden text-8xl opacity-20 md:block">
            🥑
          </div>
        </section>

        <section id="products" className="scroll-mt-28">
          <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                From farm to home
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Fresh picks for you
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Discover your everyday favorites.
              </p>
            </div>

            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            {(search || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="text-sm font-semibold text-green-700 hover:text-green-800"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <div className="text-5xl">🍃</div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                No products found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try another search or choose a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-5 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
              >
                Show all products
              </button>
            </div>
          )}
        </section>

        <footer className="mt-16 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Fruits. Fresh food, happier days. 🍃
        </footer>
      </main>
    </div>
  );
};

export default Products;
