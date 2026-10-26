import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Eye,
  X,
} from "lucide-react";
import { getAllOrders } from "../api/api";

// const initialOrders = [
//   {
//     id: "FB-1001",
//     customer: "Rahul Sharma",
//     email: "rahul@example.com",
//     date: "2026-10-16",
//     items: [
//       { name: "Fresh Red Apples", quantity: 2, price: 180 },
//       { name: "Sweet Bananas", quantity: 1, price: 60 },
//     ],
//     total: 420,
//     payment: "Paid",
//     status: "Delivered",
//     address: "Indiranagar, Bengaluru",
//   },
//   {
//     id: "FB-1002",
//     customer: "Priya Das",
//     email: "priya@example.com",
//     date: "2026-10-17",
//     items: [
//       { name: "Fresh Oranges", quantity: 2, price: 90 },
//       { name: "Fresh Strawberries", quantity: 1, price: 120 },
//     ],
//     total: 300,
//     payment: "Paid",
//     status: "Processing",
//     address: "Whitefield, Bengaluru",
//   },
//   {
//     id: "FB-1003",
//     customer: "Amit Kumar",
//     email: "amit@example.com",
//     date: "2026-10-17",
//     items: [{ name: "Green Broccoli", quantity: 3, price: 55 }],
//     total: 165,
//     payment: "Pending",
//     status: "Pending",
//     address: "Koramangala, Bengaluru",
//   },
//   {
//     id: "FB-1004",
//     customer: "Sneha Roy",
//     email: "sneha@example.com",
//     date: "2026-10-18",
//     items: [
//       { name: "Ripe Mangoes", quantity: 2, price: 140 },
//       { name: "Red Grapes", quantity: 1, price: 100 },
//     ],
//     total: 380,
//     payment: "Paid",
//     status: "Shipped",
//     address: "Jayanagar, Bengaluru",
//   },
//   {
//     id: "FB-1005",
//     customer: "David Lal",
//     email: "david@example.com",
//     date: "2026-10-18",
//     items: [{ name: "Fresh Carrots", quantity: 2, price: 45 }],
//     total: 90,
//     payment: "Failed",
//     status: "Cancelled",
//     address: "Electronic City, Bengaluru",
//   },
// ];

const statusStyles = {
  PENDING: "bg-amber-50 text-amber-700",
  PROCESSING: "bg-blue-50 text-blue-700",
  SHIPPED: "bg-purple-50 text-purple-700",
  DELIVERED: "bg-green-50 text-green-700",
  CANCELLED: "bg-red-50 text-red-700",
};

const paymentStyles = {
  Paid: "bg-green-50 text-green-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-700",
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  console.log(selectedOrder);
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = [order.id, order?.user.name, order?.user.email]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0,
  );
  const updateStatus = (orderId, status) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );

    setSelectedOrder((current) =>
      current?.id === orderId ? { ...current, status } : current,
    );
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    const res = await getAllOrders(token);
    if (res) {
      setOrders(res);
    }
  };

  return (
    <div className="space-y-7">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <p className="mt-1 text-sm text-gray-500">
          Track customer orders, payments, and delivery status.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total Orders"
          value={orders.length}
          icon={ShoppingCart}
          iconStyle="bg-red-50 text-red-600"
        />
        <SummaryCard
          label="Pending Orders"
          value={orders.filter((o) => o.status === "Pending").length}
          icon={Clock}
          iconStyle="bg-amber-50 text-amber-600"
        />
        <SummaryCard
          label="Delivered"
          value={orders.filter((o) => o.status === "Delivered").length}
          icon={CheckCircle2}
          iconStyle="bg-green-50 text-green-600"
        />
        <SummaryCard
          label="Paid Order Revenue"
          value={formatCurrency(totalRevenue)}
          icon={Truck}
          iconStyle="bg-blue-50 text-blue-600"
        />
      </div>

      {/* Orders table */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-bold text-gray-900">All Orders</h3>
            <p className="mt-1 text-sm text-gray-500">
              Review and manage customer purchases.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-red-400">
              <Search size={18} className="text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders..."
                aria-label="Search orders"
                className="min-w-0 bg-transparent text-sm outline-none sm:w-48"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter orders by status"
              className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-400"
            >
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-237.5 text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-4">Order ID</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Total</th>
                {/* <th className="px-5 py-4">Payment</th> */}
                <th className="px-5 py-4">Order Status</th>
                <th className="px-5 py-4 text-right">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-semibold text-red-600">
                    {order.id}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">
                      {order?.user.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {order?.user.email}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {order.createdAt}
                  </td>
                  <td className="px-5 py-4 font-semibold text-gray-900">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  {/* <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${paymentStyles[order.payment]}`}
                    >
                      {order.payment}
                    </span>
                  </td> */}
                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      aria-label={`Update status for ${order.id}`}
                      className={`rounded-full border-0 px-3 py-2 text-xs font-semibold outline-none ${statusStyles[order.status]}`}
                    >
                      {Object.keys(statusStyles).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      aria-label={`View ${order.id}`}
                      className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-14 text-center">
                    <ShoppingCart className="mx-auto text-gray-300" size={34} />
                    <p className="mt-3 font-semibold text-gray-800">
                      No orders found
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Try changing your search or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </section>

      {/* Order details modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-70 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-detail-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h3 id="order-detail-title" className="text-xl font-bold">
                  Order Details
                </h3>
                <p className="mt-1 text-sm text-gray-500">{selectedOrder.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="mt-1 font-semibold">{selectedOrder?.user.name}</p>
                <p className="text-sm text-gray-500">
                  {selectedOrder?.user.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Delivery address</p>
                <p className="mt-1 font-medium">{selectedOrder.address}</p>
              </div>

              <div>
                <h4 className="mb-3 font-semibold">Items Ordered</h4>

                {selectedOrder.items?.length > 0 ? (
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={`${item.name}-${index}`}
                        className="flex justify-between gap-3 rounded-xl bg-gray-50 p-3"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No order items are available for this order.
                  </p>
                )}
              </div>

              <div className="flex justify-between border-t pt-4">
                <span className="font-semibold">Order total</span>
                <span className="text-lg font-bold text-green-700">
                  {formatCurrency(selectedOrder.total)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-gray-100 px-3 py-2">
                  Payment: {selectedOrder.payment}
                </span>
                <span
                  className={`rounded-full px-3 py-2 ${statusStyles[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="border-t p-5 text-right">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
              >
                Close
              </button>
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
