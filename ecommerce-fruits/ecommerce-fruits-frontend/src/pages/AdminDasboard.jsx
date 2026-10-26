import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";
import StatCard from "../components/AdminStatCard";

const salesData = [
  { day: "Mon", sales: 4200 },
  { day: "Tue", sales: 5800 },
  { day: "Wed", sales: 4900 },
  { day: "Thu", sales: 7600 },
  { day: "Fri", sales: 6200 },
  { day: "Sat", sales: 9100 },
  { day: "Sun", sales: 8200 },
];

const orders = [
  {
    id: "#FB1001",
    customer: "Rahul Sharma",
    product: "Fresh Apples",
    amount: 650,
    status: "Delivered",
  },
  {
    id: "#FB1002",
    customer: "Priya Singh",
    product: "Sweet Mangoes",
    amount: 420,
    status: "Processing",
  },
  {
    id: "#FB1003",
    customer: "Amit Kumar",
    product: "Fresh Bananas",
    amount: 180,
    status: "Pending",
  },
  {
    id: "#FB1004",
    customer: "Sneha Das",
    product: "Green Grapes",
    amount: 350,
    status: "Delivered",
  },
];

const statusStyles = {
  Delivered: "bg-green-50 text-green-700",
  Processing: "bg-blue-50 text-blue-700",
  Pending: "bg-orange-50 text-orange-700",
};

export default function Dashboard() {
  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your store today.
          </p>
        </div>

        <button className="w-fit rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-100 transition hover:bg-red-700">
          + Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="₹84,250"
          change="+12.5%"
          icon={IndianRupee}
          color="red"
        />
        <StatCard
          title="Total Orders"
          value="1,284"
          change="+8.2%"
          icon={ShoppingCart}
          color="orange"
        />
        <StatCard
          title="Total Products"
          value="156"
          change="+4.6%"
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Total Customers"
          value="892"
          change="+10.3%"
          icon={Users}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">Sales Overview</h2>
              <p className="mt-1 text-sm text-gray-500">
                Weekly sales performance
              </p>
            </div>
            <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600">
              This Week
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eeeeee"
                />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <Tooltip formatter={(value) => [`₹${value}`, "Sales"]} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#dc2626"
                  strokeWidth={3}
                  fill="url(#salesFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">Inventory Summary</h2>
              <p className="mt-1 text-sm text-gray-500">Stock at a glance</p>
            </div>
            <MoreHorizontal size={22} className="text-gray-400" />
          </div>

          <div className="mt-7 space-y-6">
            {[
              {
                label: "Total Products",
                value: 156,
                percent: "100%",
                width: "100%",
                color: "bg-red-500",
              },
              {
                label: "In Stock",
                value: 128,
                percent: "82%",
                width: "82%",
                color: "bg-green-500",
              },
              {
                label: "Low Stock",
                value: 18,
                percent: "12%",
                width: "12%",
                color: "bg-orange-500",
              },
              {
                label: "Out of Stock",
                value: 10,
                percent: "6%",
                width: "6%",
                color: "bg-gray-400",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold text-gray-900">
                    {item.value}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: item.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 p-5 sm:p-6">
          <div>
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            <p className="mt-1 text-sm text-gray-500">
              Latest customer purchases
            </p>
          </div>
          <button className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700">
            View all <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{order.product}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
