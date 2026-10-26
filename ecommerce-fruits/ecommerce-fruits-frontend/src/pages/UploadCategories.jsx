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
import { getAllCategory, uploadCategory } from "../api/api";

const emptyForm = {
  name: "",
  description: "",
  active: true,
};

export default function UploadCategories() {
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  const openEditForm = (category) => {
    setForm({
      name: category.name,
      description: category.description,
      active: category.active,
    });

    setEditingId(category.id);
    setError("");
    setShowForm(true);
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
  const closeForm = () => {
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();

    if (!name) {
      setError("Please enter a category name.");
      return;
    }

    const duplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() &&
        category.id !== editingId,
    );

    if (duplicate) {
      setError("A category with this name already exists.");
      return;
    }

    if (editingId !== null) {
      setCategories((current) =>
        current.map((category) =>
          category.id === editingId
            ? { ...category, name, description, active: form.active }
            : category,
        ),
      );
    } else {
      const newCategory = {
        name,
        description,
        active: form.active,
      };

      const res = await uploadCategory(newCategory, token);
      if (res) {
        setCategories((current) => [newCategory, ...current]);
        alert("Upload successful");
      } else {
        setError("Failed to upload category.");
        return;
      }
    }

    closeForm();
  };

  const toggleActive = (id) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === id
          ? { ...category, active: !category.active }
          : category,
      ),
    );
  };

  const deleteCategory = (id) => {
    const category = categories.find((item) => item.id === id);

    if (category && window.confirm(`Delete the "${category.name}" category?`)) {
      setCategories((current) => current.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Categories
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize and manage your fruit store categories.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
        >
          <Plus size={19} />
          Add Category
        </button>
      </div>

      {/* Summary cards */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Categories</p>
            </div>
            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <Tags size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Categories</p>
              {/* <p className="mt-2 text-3xl font-bold text-gray-900">
                {activeCount}
              </p> */}
            </div>
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactive Categories</p>
              {/* <p className="mt-2 text-3xl font-bold text-gray-900">
                {categories.length - activeCount}
              </p> */}
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
            <h2 className="font-bold text-gray-900">All Categories</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your store's product categories.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-red-400">
            <Search size={18} className="text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              aria-label="Search categories"
              className="w-full min-w-0 bg-transparent text-sm outline-none sm:w-56"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Description</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="transition hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <Package size={21} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {category.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          ID: {category.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="max-w-xs px-5 py-4 text-sm text-gray-600">
                    <p className="line-clamp-2">
                      {category.description || "No description provided"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => toggleActive(category.id)}
                      title="Click to change category status"
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        category.active
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          category.active ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      {category.active ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(category)}
                        aria-label={`Edit ${category.name}`}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteCategory(category.id)}
                        aria-label={`Delete ${category.name}`}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <Tags size={36} className="mx-auto text-gray-300" />
                    <p className="mt-3 font-semibold text-gray-800">
                      No categories found
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Try another search or add a new category.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {filteredCategories.length} of {categories.length} categories
        </div> */}
      </section>

      {/* Add/Edit modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/40 p-4"
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
                  {editingId !== null ? "Edit Category" : "Add Category"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the category information below.
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
              <div>
                <label
                  htmlFor="categoryName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Category Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="categoryName"
                  type="text"
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Tropical Fruits"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label
                  htmlFor="categoryDescription"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="categoryDescription"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe the products in this category..."
                  rows={4}
                  maxLength={500}
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {form.description.length}/500
                </p>
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Active Category
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Enable this category for your store.
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

              {error && (
                <p role="alert" className="text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

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
