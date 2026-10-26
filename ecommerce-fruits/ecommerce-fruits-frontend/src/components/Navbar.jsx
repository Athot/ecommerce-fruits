import React from "react";
import { Link } from "react-router";

const Navbar = ({ search, setSearch, cartCount }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-2xl">
            🍃
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-gray-900">
            Fruits<span className="text-green-600">.</span>
          </span>
        </a>

        <div className="order-3 w-full sm:order-none sm:w-auto sm:flex-1 sm:max-w-md sm:px-6">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-green-500">
            <span className="text-gray-400">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fruits and vegetables..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              aria-label="Search products"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-xs text-gray-500">Welcome back</p>
            <p className="text-sm font-semibold text-gray-800">Guest</p>
          </div>

          <button
            type="button"
            className="relative flex h-11 items-center gap-2 rounded-xl bg-green-600 px-4 text-sm font-semibold text-white transition hover:bg-green-700"
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <Link
              to="/cart"
              className="relative flex h-11 items-center gap-2 rounded-xl bg-green-600 px-4 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <span>🛒</span>
              <span>Cart</span>
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-green-700">
                {cartCount}
              </span>
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
