import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const { cart, cartTotal } = useCart();

  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const deliveryFee = deliveryMethod === "express" ? 99 : 40;
  const freeDeliveryLimit = 499;
  const actualDeliveryFee = cartTotal >= freeDeliveryLimit ? 0 : deliveryFee;

  const finalTotal = cartTotal + actualDeliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty. Please add some products first.");
      navigate("/products");
      return;
    }

    setLoading(true);

    const orderId = `FR-${Date.now().toString().slice(-8)}`;

    // Frontend demo only. No real payment or backend request.
    navigate("/order-success", {
      state: {
        orderId,
        customer: formData,
        items: cart,
        subtotal: cartTotal,
        deliveryFee: actualDeliveryFee,
        total: finalTotal,
        paymentMethod,
        deliveryMethod,
      },
    });
  };

  if (cart.length === 0) {
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
          to="/product"
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
          <Link to="/product" className="text-2xl font-extrabold text-gray-900">
            Fruits<span className="text-green-600">.</span>
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>🛡️</span>
            <span>Secure checkout</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Page heading */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="text-sm font-medium text-green-700 hover:text-green-800"
          >
            ← Back to cart
          </Link>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Just a few details and your fresh order will be ready.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Left side: checkout form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Delivery information */}
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
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

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
                      autoComplete="tel"
                      pattern="[6-9][0-9]{9}"
                      title="Enter a valid 10-digit Indian mobile number"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Street Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House number, street, apartment..."
                      autoComplete="street-address"
                      rows={3}
                      required
                      className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

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
                      autoComplete="address-level2"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

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
                      autoComplete="address-level1"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit PIN code"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:max-w-xs"
                    />
                  </div>
                </div>
              </section>

              {/* Delivery method */}
              <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                    🚚
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Delivery Method
                    </h2>
                    <p className="text-sm text-gray-500">
                      Choose how quickly you need your order.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 transition ${
                      deliveryMethod === "standard"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        value="standard"
                        checked={deliveryMethod === "standard"}
                        onChange={() => setDeliveryMethod("standard")}
                        className="h-4 w-4 accent-green-600"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          Standard Delivery
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Estimated 2–3 days
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                      {cartTotal >= freeDeliveryLimit ? "FREE" : "₹40"}
                    </span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 transition ${
                      deliveryMethod === "express"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        value="express"
                        checked={deliveryMethod === "express"}
                        onChange={() => setDeliveryMethod("express")}
                        className="h-4 w-4 accent-green-600"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          Express Delivery
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Estimated within 24 hours
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                      {cartTotal >= freeDeliveryLimit ? "FREE" : "₹99"}
                    </span>
                  </label>
                </div>

                {cartTotal < freeDeliveryLimit && (
                  <p className="mt-4 text-sm text-green-700">
                    Add ₹{(freeDeliveryLimit - cartTotal).toFixed(2)} more to
                    qualify for free delivery.
                  </p>
                )}
              </section>

              {/* Payment method */}
              <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                    💳
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Payment Method
                    </h2>
                    <p className="text-sm text-gray-500">
                      Select your preferred payment option.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      paymentMethod === "cod"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="h-4 w-4 accent-green-600"
                    />
                    <span className="text-2xl">💵</span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      paymentMethod === "online"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="h-4 w-4 accent-green-600"
                    />
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Online Payment
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Demo option only — no real payment.
                      </p>
                    </div>
                  </label>
                </div>
              </section>
            </div>

            {/* Right side: order summary */}
            <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-6">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

              <p className="mt-1 text-sm text-gray-500">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items in
                your order
              </p>

              <div className="mt-6 max-h-80 space-y-4 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl bg-gray-50 object-cover"
                      />
                      <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-700 px-1 text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        ₹{Number(item.price).toFixed(2)} / {item.unit}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm font-bold text-gray-900">
                      ₹{(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-dashed border-gray-200" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-3 text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-gray-900">
                    {actualDeliveryFee === 0
                      ? "FREE"
                      : `₹${actualDeliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-gray-600">
                  <span>Discount</span>
                  <span className="font-medium text-green-700">₹0.00</span>
                </div>
              </div>

              <div className="my-5 border-t border-gray-200" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-base font-bold text-gray-900">
                  Total Amount
                </span>
                <span className="text-2xl font-extrabold text-green-700">
                  ₹{finalTotal.toFixed(2)}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Inclusive of displayed prices. Demo pricing only.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-green-600 px-5 py-4 font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Processing..."
                  : `Place Order · ₹${finalTotal.toFixed(2)}`}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                By placing your order, you agree to our terms and conditions.
                This is a frontend demo; no actual order or payment is made.
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
