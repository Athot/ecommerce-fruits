import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart } =
    useCart();

  return (
    <div className="min-h-screen bg-[#f8faf4]">
      <Navbar search="" setSearch={() => {}} cartCount={cartCount} />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/product"
            className="text-sm font-semibold text-green-700 hover:text-green-800"
          >
            ← Continue shopping
          </Link>

          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            Your shopping cart
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center">
            <div className="text-6xl">🛒</div>
            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Let's find something fresh and delicious.
            </p>
            <Link
              to="/product"
              className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_350px]">
            <section className="space-y-4">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-full rounded-xl object-cover sm:w-32"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-green-700">
                      {item.category}
                    </p>
                    <h2 className="mt-1 font-bold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">{item.unit}</p>
                    <p className="mt-2 font-bold text-gray-900">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-8 w-8 rounded-lg hover:bg-gray-100"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span className="min-w-4 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-8 w-8 rounded-lg hover:bg-gray-100"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="rounded-2xl border border-gray-100 bg-white p-6">
              <h2 className="text-lg font-bold text-gray-900">Order summary</h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-700">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white transition hover:bg-green-700"
              >
                Proceed to checkout →
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                Demo checkout · No payment will be processed
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
