import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/5">
      <div
        className="relative aspect-[4/3] overflow-hidden bg-gray-50"
        onClick={() => navigate(`/products/${product.id}`)}
        role="link"
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 cursor-pointer"
        />

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-green-700">
            {product.category}
          </span>
          <span className="text-xs text-gray-500">⭐ {product.rating}</span>
        </div>

        <h3 className="truncate text-base font-bold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">{product.unit}</p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-xl font-extrabold text-gray-900">
            ₹{product.price}
          </p>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="rounded-xl bg-green-50 px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
            aria-label={`Add ${product.name} to cart`}
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
