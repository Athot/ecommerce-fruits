import { TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color = "red",
}) {
  const styles = {
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            {value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${styles[color]}`}>
          <Icon size={23} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-1 text-xs text-green-600">
        <TrendingUp size={15} />
        <span className="font-semibold">{change}</span>
        <span className="text-gray-400">from last month</span>
      </div>
    </div>
  );
}
