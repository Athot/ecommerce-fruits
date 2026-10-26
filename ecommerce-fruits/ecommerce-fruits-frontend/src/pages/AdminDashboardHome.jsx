import { useState } from "react";
import Dashboard from "./AdminDasboard";
import Sidebar from "../components/AdminSidebar";
import Topbar from "../components/AdminTopbar";
import UploadCategories from "./UploadCategories";
import UploadProduct from "./UploadProduct";
import AdminOrders from "./AdminOrders";
import CustomerScreen from "./CustomerScreen";
import SettingsPage from "./SettingPage";
import ProductScreen from "./ProductScreen";

export default function AdminDashboardHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const renderPage = () => {
    debugger;
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;

      case "Products":
        return <ProductScreen />;

      case "Categories":
        return <UploadCategories />;

      case "Orders":
        return <AdminOrders />;

      case "Customers":
        return <CustomerScreen />;

      case "Analytics":
      // return <Analytics />;

      case "Settings":
        return <SettingsPage />;

      default:
      // return <Dashboard />;
    }
  };
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

        <main className="p-4 sm:p-6 lg:p-8">{renderPage()}</main>
      </div>
    </div>
  );
}
