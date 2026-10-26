import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8faf4] px-4">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <Link
          to="/products"
          className="mt-5 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const productImages = product?.images?.length
    ? product.images
    : product?.image
      ? [product.image]
      : [];

  const [selectedImage, setSelectedImage] = useState(0);

  const description =
    product.description ||
    `Enjoy fresh, delicious ${product.name.toLowerCase()}, carefully selected for quality and taste. Perfect for everyday meals and a healthy lifestyle.`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
  };

  return (
    <div className="min-h-screen bg-[#f8faf4]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="text-2xl font-extrabold tracking-tight text-gray-900"
          >
            Fruits<span className="text-green-600">.</span>
          </Link>

          <Link
            to="/cart"
            className="rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            🛒 View Cart
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link to="/products" className="hover:text-green-700">
            Home
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="font-medium text-gray-900">{product.name}</span>
        </nav>

        {/* Product information */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product image */}

          {/* Product image gallery */}
          <section className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-4">
              {/* Thumbnail images */}
              <div className="flex flex-col gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImage === index}
                    className={`aspect-square overflow-hidden rounded-xl border-2 bg-gray-50 transition ${
                      selectedImage === index
                        ? "border-green-600 ring-2 ring-green-100"
                        : "border-transparent hover:border-green-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl bg-[#f8faf4] sm:min-h-[460px]">
                <img
                  key={productImages[selectedImage]}
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="h-full max-h-[460px] w-full object-contain p-4 transition duration-300 sm:p-8"
                />
              </div>
            </div>

            {/* Product badges */}
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                🌿 Fresh Produce
              </span>

              {product.badge && (
                <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
                  ⭐ {product.badge}
                </span>
              )}
            </div>
          </section>

          {/* Product details */}
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
              {product.category}
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-lg text-amber-500">★★★★★</span>
              <span className="font-semibold text-gray-800">
                {product.rating}
              </span>
              <span className="text-sm text-gray-500">Customer rating</span>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-green-700">
                ₹{Number(product.price).toFixed(2)}
              </span>
              <span className="text-gray-500">/ {product.unit}</span>
            </div>

            <p className="mt-6 leading-7 text-gray-600">{description}</p>

            {/* Benefits */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-green-50 p-3 text-center">
                <div className="text-2xl">🌱</div>
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  Fresh Produce
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-center">
                <div className="text-2xl">🚚</div>
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  Home Delivery
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-center">
                <div className="text-2xl">💚</div>
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  Quality Picks
                </p>
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mt-8">
              <label className="mb-3 block text-sm font-semibold text-gray-800">
                Select Quantity
              </label>

              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="px-4 py-3 text-lg text-gray-700 hover:text-green-700 disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="min-w-10 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    disabled={quantity >= 99}
                    aria-label="Increase quantity"
                    className="px-4 py-3 text-lg text-gray-700 hover:text-green-700 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <p className="text-sm text-gray-500">
                  Total:{" "}
                  <span className="font-bold text-gray-900">
                    ₹{(Number(product.price) * quantity).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 rounded-xl bg-green-600 px-5 py-4 font-bold text-white transition hover:bg-green-700"
              >
                {added ? "✓ Added to Cart" : "🛒 Add to Cart"}
              </button>

              <Link
                to="/cart"
                className="flex-1 rounded-xl border border-green-600 px-5 py-4 text-center font-bold text-green-700 transition hover:bg-green-50"
              >
                Go to Cart
              </Link>
            </div>

            {added && (
              <p className="mt-4 text-sm font-medium text-green-700">
                {quantity} {quantity === 1 ? "item" : "items"} added to your
                cart successfully!
              </p>
            )}

            <div className="mt-7 border-t border-gray-100 pt-5 text-sm leading-7 text-gray-500">
              <p>✓ Carefully selected products</p>
              <p>✓ Convenient online shopping</p>
              <p>✓ Simple and secure checkout experience</p>
            </div>
          </section>
        </div>

        {/* Description section */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            About {product.name}
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            {description} Explore more products in our{" "}
            <Link
              to="/products"
              className="font-semibold text-green-700 hover:underline"
            >
              fresh collection
            </Link>{" "}
            and find something you love.
          </p>
        </section>
      </main>

      <footer className="mt-8 border-t border-gray-100 bg-white px-4 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Fruits. Freshness delivered with care.
      </footer>
    </div>
  );
};

export default ProductDetails;
