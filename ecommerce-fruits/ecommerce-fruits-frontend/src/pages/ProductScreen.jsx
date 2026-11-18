import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Tags,
  CheckCircle2,
  XCircle,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router";
import {
  editProduct,
  getAllCategory,
  getAllProduct,
  IMAGE_BASE_URL,
} from "../api/api";

const emptyForm = {
  description: "",
  brand: "",
  price: "",
  categoryId: "",
  releaseDate: "",
  available: true,
  quantity: 0,
  active: true,
  deleted: false,
  images: [],
};

export default function ProductScreen() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [newImages, setNewImages] = useState([]);
  const token = localStorage.getItem("token");

  const [existingCategories, setFilteredCategories] = useState([]);
  useEffect(() => {
    fetchAllProduct();
    fetchAllCategory();
  }, []);

  // api to get all the category
  const fetchAllCategory = async () => {
    const data = await getAllCategory(token);
    if (data) {
      setFilteredCategories(data);
    }
  };

  const fetchAllProduct = async () => {
    const res = await getAllProduct(token);
    if (res) {
      setAllProducts(res);
    }
  };
  const filteredProduct = allProducts.filter((product) =>
    `${product.name} ${product.description}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const activeCount = allProducts.filter((product) => product.active).length;

  const openEditForm = (product) => {
    setForm({
      description: product.description || "",
      brand: product.brand || "",
      price: product.price?.toString() || "",
      categoryId: product.categoryId?.toString() || "",
      releaseDate: product.releaseDate || "",
      available: product.available ?? true,
      quantity: product.quantity ?? 0,
      active: product.active ?? true,
      deleted: product.deleted ?? false,
      images: product.images || [],
    });

    setEditingId(product.id);
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.brand.trim();

    if (!name) {
      setError("Please enter a product name.");
      return;
    }

    const duplicate = allProducts.some(
      (product) =>
        product.brand.toLowerCase() === name.toLowerCase() &&
        product.id !== editingId,
    );

    if (duplicate) {
      setError("Product with this name already exists.");
      return;
    }
    debugger;
    if (editingId !== null) {
      try {
        const productData = {
          description: form.description,
          brand: form.brand,
          price: form.price,
          categoryId: form.categoryId,
          releaseDate: form.releaseDate,
          available: form.available,
          quantity: form.quantity,
          active: form.active,
          deleted: form.deleted,
          images: form.images,
        };

        const formData = new FormData();

        // Existing product details and image paths
        formData.append(
          "product",
          new Blob([JSON.stringify(productData)], {
            type: "application/json",
          }),
        );

        // Newly selected image files
        newImages.forEach((image) => {
          formData.append("images", image);
        });

        const res = await editProduct(token, editingId, formData);

        if (res) {
          alert("Product updated successfully!");

          await fetchAllProduct();
          await fetchAllCategory();

          closeForm();
        }
      } catch (error) {
        console.error("Update product failed:", error);
        setError("Failed to update product.");
      }
    }
  };

  const toggleActive = (id) => {
    setAllProducts((current) =>
      current.map((product) =>
        product.id === id ? { ...product, active: !product.active } : product,
      ),
    );
  };

  const deleteCategory = (id) => {
    const category = allProducts.find((item) => item.id === id);

    if (
      category &&
      window.confirm(`Delete the "${allProducts.brand}" product?`)
    ) {
      setAllProducts((current) => current.filter((item) => item.id !== id));
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Product
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize and manage your fruit store product.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/upload-product")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
        >
          <Plus size={19} />
          Add Product
        </button>
      </div>

      {/* Summary cards */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Product</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {allProducts.length}
              </p>
            </div>
            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <Tags size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Product</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {activeCount}
              </p>
            </div>
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactive Product</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {allProducts.length - activeCount}
              </p>
            </div>
            <div className="rounded-xl bg-gray-100 p-3 text-gray-600">
              <XCircle size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Category list */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-gray-900">All Products</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your store's product.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-red-400">
            <Search size={18} className="text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product..."
              aria-label="Search product"
              className="w-full min-w-0 bg-transparent text-sm outline-none sm:w-56"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-4 font-semibold">Product ID</th>
                <th className="px-5 py-4 font-semibold">Description</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredProduct.map((product) => (
                <tr key={product.id} className="transition hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <Package size={21} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          ID: {product.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="max-w-xs px-5 py-4 text-sm text-gray-600">
                    <p className="line-clamp-2">
                      {product.description || "No description provided"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => toggleActive(product.id)}
                      title="Click to change category status"
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        product.active
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          product.active ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      {product.active ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(product)}
                        aria-label={`Edit ${product.name}`}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteCategory(product.id)}
                        aria-label={`Delete ${product.brand}`}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProduct.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <Tags size={36} className="mx-auto text-gray-300" />
                    <p className="mt-3 font-semibold text-gray-800">
                      No Product found
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Try another search or add a new product.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {filteredProduct.length} of {allProducts.length} product
        </div>
      </section>

      {/* Add/Edit modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeForm();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-form-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-5 sm:p-6">
              <div>
                <h2
                  id="category-form-title"
                  className="text-xl font-bold text-gray-900"
                >
                  {editingId !== null ? "Edits Category" : "Add Category"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the product information below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
              {/* Product Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Enter product description"
                  required
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                />
              </div>

              {/* Brand and Price */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Brand *
                  </label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                    placeholder="Enter brand"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="0.00"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category *
                </label>
                <select
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm({ ...form, categoryId: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                >
                  <option value="">Select category</option>
                  {existingCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* product images */}

              {/* Product Images */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Images
                </label>

                {/* Existing Images */}
                {form.images?.length > 0 && (
                  <>
                    <p className="mb-3 text-sm text-gray-500">
                      Existing Images
                    </p>

                    <div className="mb-4 grid grid-cols-3 gap-3">
                      {form.images.map((image, index) => (
                        <div key={image} className="relative">
                          <img
                            src={`${IMAGE_BASE_URL}${image}`}
                            alt={`Product ${index + 1}`}
                            className="h-28 w-full rounded-xl border object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                images: prev.images.filter(
                                  (_, i) => i !== index,
                                ),
                              }))
                            }
                            className="absolute right-1 top-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Upload New Images */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    setNewImages((prev) => [
                      ...prev,
                      ...Array.from(e.target.files),
                    ]);
                    e.target.value = "";
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                />

                {/* Newly Selected Images */}
                {newImages.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-3 text-sm text-gray-500">New Images</p>

                    <div className="grid grid-cols-3 gap-3">
                      {newImages.map((image, index) => (
                        <div
                          key={`${image.name}-${index}`}
                          className="relative"
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                            className="h-28 w-full rounded-xl border object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setNewImages((prev) =>
                                prev.filter((_, i) => i !== index),
                              )
                            }
                            className="absolute right-1 top-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Release Date and Quantity */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Release Date
                  </label>
                  <input
                    type="date"
                    value={form.releaseDate}
                    onChange={(e) =>
                      setForm({ ...form, releaseDate: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({ ...form, quantity: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3"
                  />
                </div>
              </div>

              {/* Availability */}
              <label className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Available
                  </p>
                  <p className="text-xs text-gray-500">
                    Is this product available for purchase?
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) =>
                    setForm({ ...form, available: e.target.checked })
                  }
                  className="h-5 w-5 accent-red-600"
                />
              </label>

              {/* Active Status */}
              <label className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Active Product
                  </p>
                  <p className="text-xs text-gray-500">
                    Enable this product in the store.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) =>
                    setForm({ ...form, active: e.target.checked })
                  }
                  className="h-5 w-5 accent-red-600"
                />
              </label>
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  {editingId !== null ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
