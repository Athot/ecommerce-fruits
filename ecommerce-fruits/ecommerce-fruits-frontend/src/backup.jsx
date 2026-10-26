import { useState } from "react";
import Sidebar from "./components/AdminSidebar";
import Topbar from "./components/AdminTopbar";
import Dashboard from "./pages/AdminDasboard";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="min-h-screen lg:pl-64">
        <Topbar setOpen={setSidebarOpen} activePage={activePage} />

        <main className="p-4 sm:p-6 lg:p-8">
          {activePage === "Dashboard" ? (
            <Dashboard />
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h1 className="text-xl font-bold text-gray-900">{activePage}</h1>
              <p className="mt-2 text-sm text-gray-500">
                We'll build this management page next.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
