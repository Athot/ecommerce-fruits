import { useEffect, useState } from "react";
import Sidebar from "../components/AdminSidebar";
import Topbar from "../components/AdminTopbar";

import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { getAllCategory, uploadProduct } from "../api/api";
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
};

export default function UploadProduct() {
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("Products");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const token = localStorage.getItem("token");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);
  const fetchAllCategory = async () => {
    const data = await getAllCategory(token);
    if (data) {
      setFilteredCategories(data);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // if we want to send with the id
      // const selectedCategory = filteredCategories.find(
      //   (category) => String(category.id) === String(form.categoryId),
      // );
      console.log(filteredCategories);
      // if we want to send with the name
      const selectedCategory = filteredCategories.find(
        (category) => String(category.id) === String(form.categoryId),
      );

      if (!selectedCategory) {
        setError("Please select a valid category.");
        return;
      }

      if (!selectedCategory) {
        setError("Please select a valid category.");
        return;
      }

      if (images.length === 0) {
        setError("Please select at least one product image.");
        return;
      }

      const payload = {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
        category: {
          id: selectedCategory.id,
          // name: selectedCategory.name,
        },
      };

      // create multiple form data
      const formData = new FormData();

      // send product details as JSON
      formData.append(
        "product",
        new Blob([JSON.stringify(payload)], {
          type: "application/json",
        }),
      );

      // sebd the actual image file separately
      images.forEach((img) => {
        formData.append("image", img);
      });
      console.log("Product payload:", payload);

      const res = await uploadProduct(formData, token);

      if (res) {
        alert("Product uploaded successfully!");
        setForm({ ...emptyForm });
      }
    } catch (err) {
      console.error("Product upload error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to upload product.",
      );
    }
  };
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        open={open}
        setOpen={setOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main content: leave room for the fixed sidebar */}
      <div className="min-h-screen min-w-0 lg:ml-64">
        {/* Topbar */}
        <Topbar setOpen={setOpen} activePage="Add Product" />

        {/* Product form */}
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          {/* Heading */}
          <div className="flex items-center gap-3 mb-2">
            {/* in here ther will be previous button */}
            <FaArrowLeft
              className="cursor-pointer text-gray-600"
              onClick={() => navigate("/dashboard")}
            />
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Product
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-8"
          >
            {/* Product Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Product Description *
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter product description"
                required
                rows={3}
                className={inputClass}
              />
            </div>

            {/* Brand and Price */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Brand *
                </label>

                <input
                  name="brand"
                  type="text"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Enter brand"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price (₹) *
                </label>

                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category *
              </label>

              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select category</option>
                {/* Replace with categories fetched from your API */}
                {filteredCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* image */}
            {/* this is for uploading only small image */}
            {/* <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Upload Image *
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setImage(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="w-full rounded-lg border border-gray-300 p-3"
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="mt-4 h-40 w-40 rounded-lg border object-cover"
                />
              )}
            </div> */}
            {/* if we want to upload multiple image */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Upload Product Images *
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);

                  setImages(files);

                  setImagePreviews((previous) => {
                    previous.forEach((url) => URL.revokeObjectURL(url));
                    return files.map((file) => URL.createObjectURL(file));
                  });
                }}
                className="w-full rounded-lg border border-gray-300 p-3"
              />

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {imagePreviews.map((preview, index) => (
                  <div key={preview} className="relative">
                    <img
                      src={preview}
                      alt={`Product preview ${index + 1}`}
                      className="h-40 w-full rounded-lg border object-cover"
                    />

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {images[index]?.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Release Date and Quantity */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Release Date
                </label>

                <input
                  name="releaseDate"
                  type="date"
                  value={form.releaseDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Quantity *
                </label>

                <input
                  name="quantity"
                  type="number"
                  min="0"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Available */}
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">Available</p>
                <p className="mt-1 text-xs text-gray-500">
                  Is this product available for purchase?
                </p>
              </div>

              <input
                name="available"
                type="checkbox"
                checked={form.available}
                onChange={handleChange}
                className="h-5 w-5 accent-red-600"
              />
            </label>

            {/* Active Product */}
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Active Product
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Enable this product in the store.
                </p>
              </div>

              <input
                name="active"
                type="checkbox"
                checked={form.active}
                onChange={handleChange}
                className="h-5 w-5 accent-red-600"
              />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Form actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setForm(emptyForm)}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Reset
              </button>

              <button
                type="submit"
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                Add Product
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
