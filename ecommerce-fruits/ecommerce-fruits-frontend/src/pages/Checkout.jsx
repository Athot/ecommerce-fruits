import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserCart, IMAGE_BASE_URL, placeOrder } from "../api/api";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const userID = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // Fetch user's cart
  const fetchUserCart = async () => {
    try {
      const data = await getUserCart(token, userID);

      if (data) {
        setCart(Array.isArray(data) ? data : data.data || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert("Unable to fetch your cart.");
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Get product details from cart item
  const getProduct = (item) => item.product || item;

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    const product = getProduct(item);

    return total + Number(product.price || 0) * Number(item.quantity || 0);
  }, 0);

  // Total quantity
  const totalItems = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  // Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/products");
      return;
    }

    if (!token || !userID) {
      alert("Please login to place your order.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      // Send delivery information to backend
      const response = await placeOrder(token, userID, formData);
      if (response) {
        alert("Order placed successfully!");
        navigate("/order-success", {
          state: {
            order: response,
            customer: formData,
            items: cart,
          },
        });
      }
    } catch (error) {
      console.error("Order placement failed:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to place your order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Empty cart
  if (cart.length === 0 && !loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8faf4] px-4 text-center">
        <div className="text-6xl">🛒</div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h1>

        <p className="mt-2 text-gray-500">
          Add some fresh products before checking out.
        </p>

        <Link
          to="/products"
          className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf4]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="text-2xl font-extrabold text-gray-900"
          >
            Fruits<span className="text-green-600">.</span>
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            🛡️ Secure checkout
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Heading */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="text-sm font-medium text-green-700 hover:text-green-800"
          >
            ← Back to cart
          </Link>

          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your delivery details to complete your order.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Delivery Information */}
            <div className="lg:col-span-2">
              <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                    📍
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Delivery Information
                    </h2>

                    <p className="text-sm text-gray-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Street Address
                    </label>

                    <textarea
                      name="addressLine"
                      value={formData.addressLine}
                      onChange={handleChange}
                      placeholder="House number, street, apartment..."
                      rows={3}
                      required
                      className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter your state"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  {/* Postal Code */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      PIN Code
                    </label>

                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="6-digit PIN code"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:max-w-xs"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Order Summary */}
            <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-6">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

              <p className="mt-1 text-sm text-gray-500">
                {totalItems} items in your order
              </p>

              {/* Cart Items */}
              <div className="mt-6 max-h-80 space-y-4 overflow-y-auto">
                {cart.map((item) => {
                  const product = getProduct(item);

                  return (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={`${IMAGE_BASE_URL}${item?.product.images[0]}`}
                          alt={product.label}
                          className="h-16 w-16 rounded-xl bg-gray-50 object-cover"
                        />

                        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-700 px-1 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          ₹{Number(product.price).toFixed(2)}
                        </p>
                      </div>

                      <p className="whitespace-nowrap text-sm font-bold text-gray-900">
                        ₹
                        {(
                          Number(product.price) * Number(item.quantity)
                        ).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="my-6 border-t border-dashed border-gray-200" />

              {/* Price Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span className="font-medium text-gray-900">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>

                  <span className="font-medium text-green-700">FREE</span>
                </div>
              </div>

              <div className="my-5 border-t border-gray-200" />

              {/* Total */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-base font-bold text-gray-900">
                  Total Amount
                </span>

                <span className="text-2xl font-extrabold text-green-700">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Final amount is calculated by the server using current product
                prices.
              </p>

              {/* Place Order */}
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="mt-6 w-full rounded-xl bg-green-600 px-5 py-4 font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                Please verify your delivery information before placing your
                order.
              </p>
            </aside>
          </div>
        </form>
      </main>

      <footer className="border-t border-gray-100 bg-white py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Fruits. Freshness delivered with care.
      </footer>
    </div>
  );
};

export default Checkout;
