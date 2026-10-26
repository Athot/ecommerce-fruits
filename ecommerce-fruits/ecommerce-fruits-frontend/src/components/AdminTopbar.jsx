import { Bell, Menu, Search } from "lucide-react";

export default function Topbar({ setOpen, activePage }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={23} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            {activePage}
          </h2>
          <p className="hidden text-xs text-gray-500 sm:block">
            Manage your fruit store
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 md:flex">
          <Search size={17} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-36 bg-transparent text-sm outline-none lg:w-48"
          />
        </div>

        <button
          aria-label="Notifications"
          className="relative rounded-xl border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-bold text-red-700">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">Administrator</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
