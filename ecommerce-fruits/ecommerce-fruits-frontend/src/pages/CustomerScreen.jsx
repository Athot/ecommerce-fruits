import { useEffect, useMemo, useState } from "react";
import { Search, Users, UserCheck, Eye, X, Mail } from "lucide-react";
import { getAllUsers } from "../api/api";

export default function CustomerScreen() {
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    fetchAllUsers();
  }, []);
  const fetchAllUsers = async () => {
    const res = await getAllUsers(token);
    if (res) {
      setAllUsers(res);
    }
  };
  const filteredCustomers = useMemo(() => {
    return allUsers.filter((customer) => {
      const matchesSearch = [customer.name, customer.email]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [allUsers, search]);

  return (
    <div className="space-y-7">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
        <p className="mt-1 text-sm text-gray-500">
          View customer profiles and manage customer status.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total Customers"
          value={allUsers.length}
          icon={Users}
          iconStyle="bg-red-50 text-red-600"
        />
      </div>

      {/* Customer table */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-bold text-gray-900">All Customers</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage customer profiles and account status.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-red-400">
              <Search size={18} className="text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customers..."
                aria-label="Search customers"
                className="min-w-0 bg-transparent text-sm outline-none sm:w-52"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter customers by status"
              className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-400"
            >
              <option value="All">All customers</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Role</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {customer.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="mt-1 text-xs text-gray-500">
                      {customer.email}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => toggleCustomerStatus(customer.id)}
                      title="Click to change customer status"
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        customer.role === "ADMIN"
                          ? "bg-red-50 text-red-700"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {customer.role}
                    </button>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(customer)}
                      aria-label={`View ${customer.name}`}
                      className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-14 text-center">
                    <Users size={36} className="mx-auto text-gray-300" />
                    <p className="mt-3 font-semibold text-gray-800">
                      No customers found
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Try another search or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {filteredCustomers.length} of {allUsers.length} customers
        </div>
      </section>

      {/* Customer details modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-70 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-detail-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b p-5">
              <h3 id="customer-detail-title" className="text-xl font-bold">
                Customer Details
              </h3>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                aria-label="Close customer details"
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center rounded-2xl bg-red-50 p-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold text-red-600 shadow-sm">
                  {selectedCustomer.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
                <h4 className="mt-3 text-xl font-bold text-gray-900">
                  {selectedCustomer.name}
                </h4>
              </div>

              <div className="mt-6 space-y-4">
                <DetailRow
                  icon={Mail}
                  label="Email"
                  value={selectedCustomer.email}
                />
                <DetailRow
                  icon={UserCheck}
                  label="Role"
                  value={selectedCustomer.role}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon, iconStyle }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`rounded-xl p-3 ${iconStyle}`}>
        <Icon size={24} />
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-gray-100 p-2 text-gray-600">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 wrap-break-word text-sm font-medium text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}
