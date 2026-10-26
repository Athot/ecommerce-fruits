import React from "react";
import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();

  const orderId =
    location.state?.orderId || `FR-${Date.now().toString().slice(-8)}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8faf4] px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
          ✓
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
          Order Confirmed
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Thank you!
        </h1>

        <p className="mt-4 leading-7 text-gray-500">
          Your order has been placed successfully. We’re getting your fresh
          fruits and vegetables ready for delivery.
        </p>

        <div className="mt-8 rounded-2xl bg-gray-50 p-5">
          <p className="text-sm text-gray-500">Your order number</p>
          <p className="mt-2 text-xl font-bold tracking-wide text-gray-900">
            {orderId}
          </p>
          <p className="mt-2 text-sm text-green-700">
            Freshness is on its way!
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/products"
            className="flex-1 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="flex-1 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Back to Login
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          This is a frontend demo. No real order or payment has been processed.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
