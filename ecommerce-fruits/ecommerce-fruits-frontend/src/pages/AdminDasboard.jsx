import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  ArrowUpRight,
} from "lucide-react";
import StatCard from "../components/AdminStatCard";
import { useEffect, useState } from "react";
import { getDashboardData } from "../api/api";

const statusStyles = {
  Delivered: "bg-green-50 text-green-700",
  Processing: "bg-blue-50 text-blue-700",
  Pending: "bg-orange-50 text-orange-700",
};

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const res = await getDashboardData(token);
    debugger;
    if (res) {
      console.log(res);
      setAllData(res);
    }
  };
  console.log(allData);
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
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={allData?.totalAmount}
          icon={IndianRupee}
          color="red"
        />
        <StatCard
          title="Total Orders"
          value={allData?.totalOrders}
          icon={ShoppingCart}
          color="orange"
        />
        <StatCard
          title="Total Products"
          value={allData?.totalProducts}
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Total Customers"
          value={allData?.totalCustomers}
          icon={Users}
          color="green"
        />
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
          <table className="w-full min-w-162.5 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {!allData?.recentOrders?.length ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No recent orders
                  </td>
                </tr>
              ) : (
                <>
                  {allData?.recentOrders?.map((order) => (
                    <tr key={order.orderId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {order.customerName}
                      </td>

                      {/* <td className="px-6 py-4 text-gray-600">{order.product}</td> */}
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
                </>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
