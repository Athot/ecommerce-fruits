import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Apple,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Products", icon: Package },
  { label: "Categories", icon: Tags },
  { label: "Orders", icon: ShoppingCart },
  { label: "Customers", icon: Users },
  // { label: "Analytics", icon: BarChart3 },
];

export default function Sidebar({ open, setOpen, activePage, setActivePage }) {
  return (
    <>
      {open && (
        <button
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col
        border-r border-gray-200 bg-white transition-transform duration-300
        lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center justify-between border-b px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-600 p-2 text-white">
              <Apple size={25} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">FruitBasket</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pt-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-1">
            {menuItems.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => {
                  setActivePage(label);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  activePage === label
                    ? "bg-red-600 text-white shadow-md shadow-red-200"
                    : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <Icon size={19} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto space-y-1 border-t p-4">
          <button
            onClick={() => {
              setActivePage("Settings");
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-100"
          >
            <Settings size={19} />
            Settings
          </button>

          <button
            onClick={() => {
              // Connect your existing logout logic here.
              window.alert("Connect your existing logout logic here.");
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
