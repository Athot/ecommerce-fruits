import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/products/${product.id}`);
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full rounded-xl bg-gray-50 object-cover"
      />

      <p className="mt-4 text-xs font-medium text-green-600">
        {product.category}
      </p>

      <h3 className="mt-1 font-bold text-gray-900">{product.name}</h3>

      <p className="mt-2 font-bold text-green-700">
        ₹{Number(product.price).toFixed(2)}
        <span className="ml-1 text-sm font-normal text-gray-500">
          / {product.unit}
        </span>
      </p>

      <p className="mt-2 text-sm text-amber-500">★ {product.rating}</p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
        className="mt-4 w-full rounded-xl border border-green-600 px-4 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
