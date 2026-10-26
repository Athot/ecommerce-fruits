import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left sidebar */}
      <Sidebar
        open={open}
        setOpen={setOpen}
        activePage="Products"
        setActivePage={() => {}}
      />

      {/* Main section */}
      <div className="min-h-screen lg:ml-64">
        {/* Top navbar */}
        <Navbar setOpen={setOpen} />

        {/* Page content changes here */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
