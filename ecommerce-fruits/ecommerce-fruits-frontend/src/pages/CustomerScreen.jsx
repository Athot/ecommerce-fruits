import { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  ShoppingBag,
  Eye,
  X,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const initialCustomers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    address: "Indiranagar, Bengaluru",
    joined: "2026-08-12",
    orders: 8,
    spent: 3240,
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Das",
    email: "priya@example.com",
    phone: "+91 98765 12340",
    address: "Whitefield, Bengaluru",
    joined: "2026-08-20",
    orders: 5,
    spent: 2180,
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91 91234 56780",
    address: "Koramangala, Bengaluru",
    joined: "2026-09-02",
    orders: 3,
    spent: 950,
    status: "Active",
  },
  {
    id: 4,
    name: "Sneha Roy",
    email: "sneha@example.com",
    phone: "+91 99887 76655",
    address: "Jayanagar, Bengaluru",
    joined: "2026-09-10",
    orders: 12,
    spent: 5870,
    status: "Active",
  },
  {
    id: 5,
    name: "David Lal",
    email: "david@example.com",
    phone: "+91 90909 80808",
    address: "Electronic City, Bengaluru",
    joined: "2026-09-15",
    orders: 1,
    spent: 450,
    status: "Inactive",
  },
  {
    id: 6,
    name: "Ananya Singh",
    email: "ananya@example.com",
    phone: "+91 90000 11122",
    address: "HSR Layout, Bengaluru",
    joined: "2026-10-01",
    orders: 6,
    spent: 2760,
    status: "Active",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

export default function CustomerScreen() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch = [customer.name, customer.email, customer.phone]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const activeCount = customers.filter(
    (customer) => customer.status === "Active",
  ).length;

  const totalSpent = customers.reduce(
    (sum, customer) => sum + customer.spent,
    0,
  );

  const totalOrders = customers.reduce(
    (sum, customer) => sum + customer.orders,
    0,
  );

  const toggleCustomerStatus = (id) => {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status: customer.status === "Active" ? "Inactive" : "Active",
            }
          : customer,
      ),
    );

    setSelectedCustomer((current) =>
      current?.id === id
        ? {
            ...current,
            status: current.status === "Active" ? "Inactive" : "Active",
          }
        : current,
    );
  };

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
          value={customers.length}
          icon={Users}
          iconStyle="bg-red-50 text-red-600"
        />

        <SummaryCard
          label="Active Customers"
          value={activeCount}
          icon={UserCheck}
          iconStyle="bg-green-50 text-green-600"
        />

        <SummaryCard
          label="Inactive Customers"
          value={customers.length - activeCount}
          icon={UserX}
          iconStyle="bg-gray-100 text-gray-600"
        />

        <SummaryCard
          label="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          iconStyle="bg-blue-50 text-blue-600"
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
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Joined Date</th>
                <th className="px-5 py-4">Orders</th>
                <th className="px-5 py-4">Total Spent</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 font-bold text-red-600">
                        {customer.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {customer.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {customer.phone}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {customer.joined}
                  </td>

                  <td className="px-5 py-4 font-semibold text-gray-800">
                    {customer.orders}
                  </td>

                  <td className="px-5 py-4 font-semibold text-gray-900">
                    {formatCurrency(customer.spent)}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => toggleCustomerStatus(customer.id)}
                      title="Click to change customer status"
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        customer.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span className="mr-1.5">●</span>
                      {customer.status}
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
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </section>

      {/* Customer details modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/40 p-4">
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
                <span
                  className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    selectedCustomer.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {selectedCustomer.status}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <DetailRow
                  icon={Mail}
                  label="Email"
                  value={selectedCustomer.email}
                />
                <DetailRow
                  icon={Phone}
                  label="Phone"
                  value={selectedCustomer.phone}
                />
                <DetailRow
                  icon={MapPin}
                  label="Address"
                  value={selectedCustomer.address}
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="mt-1 text-xl font-bold">
                    {selectedCustomer.orders}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="mt-1 text-xl font-bold text-green-700">
                    {formatCurrency(selectedCustomer.spent)}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Customer since: {selectedCustomer.joined}
              </p>

              <button
                type="button"
                onClick={() => toggleCustomerStatus(selectedCustomer.id)}
                className="mt-5 w-full rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
              >
                {selectedCustomer.status === "Active"
                  ? "Deactivate Customer"
                  : "Activate Customer"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">Total customer spending</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">
          {formatCurrency(totalSpent)}
        </p>
      </div>
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
        <p className="mt-1 break-words text-sm font-medium text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}
