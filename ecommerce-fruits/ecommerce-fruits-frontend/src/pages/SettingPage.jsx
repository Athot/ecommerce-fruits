import { useState } from "react";
import {
  Store,
  UserRound,
  Bell,
  ShieldCheck,
  Save,
  Camera,
  LockKeyhole,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const initialSettings = {
  storeName: "FruitBasket",
  storeEmail: "support@fruitbasket.com",
  storePhone: "+91 98765 43210",
  address: "Bengaluru, Karnataka, India",
  adminName: "Administrator",
  adminEmail: "admin@fruitbasket.com",
  emailNotifications: true,
  orderNotifications: true,
  lowStockNotifications: false,
  marketingEmails: false,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100";

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("Store");
  const [message, setMessage] = useState("");

  const updateField = (field, value) => {
    setSettings((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (
      activeTab === "Security" &&
      settings.newPassword !== settings.confirmPassword
    ) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    if (
      activeTab === "Security" &&
      settings.newPassword &&
      !settings.currentPassword
    ) {
      setMessage("Enter your current password first.");
      return;
    }

    // Frontend demo only. Replace this with your Spring Boot API later.
    if (activeTab === "Security" && settings.newPassword) {
      setSettings((current) => ({
        ...current,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }

    setMessage("Settings saved for this session.");
  };

  const tabs = [
    { label: "Store", icon: Store },
    { label: "Profile", icon: UserRound },
    { label: "Notifications", icon: Bell },
    { label: "Security", icon: ShieldCheck },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your store information, admin profile, and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Settings navigation */}
        <aside className="rounded-2xl border border-gray-200 bg-white p-3">
          <p className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            General Settings
          </p>

          <nav className="space-y-1">
            {tabs.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setActiveTab(label);
                  setMessage("");
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  activeTab === label
                    ? "bg-red-600 text-white shadow-md shadow-red-100"
                    : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <Icon size={19} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings content */}
        <form
          onSubmit={handleSave}
          className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="border-b border-gray-100 p-5 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900">
              {activeTab === "Store" && "Store Information"}
              {activeTab === "Profile" && "Admin Profile"}
              {activeTab === "Notifications" && "Notification Preferences"}
              {activeTab === "Security" && "Security Settings"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === "Store" &&
                "Update the information displayed for your store."}
              {activeTab === "Profile" &&
                "Manage the details associated with your admin account."}
              {activeTab === "Notifications" &&
                "Choose which notifications you want to receive."}
              {activeTab === "Security" &&
                "Change your password and keep your account secure."}
            </p>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            {activeTab === "Store" && (
              <>
                <div className="flex flex-col gap-4 rounded-xl bg-red-50 p-4 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white">
                    <Store size={30} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {settings.storeName}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Store branding and contact information
                    </p>
                    <p className="mt-1 text-xs text-red-600">
                      Logo upload can be connected later.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Store Name"
                    value={settings.storeName}
                    onChange={(v) => updateField("storeName", v)}
                    placeholder="Enter store name"
                    required
                  />
                  <Field
                    label="Store Email"
                    type="email"
                    value={settings.storeEmail}
                    onChange={(v) => updateField("storeEmail", v)}
                    placeholder="support@example.com"
                    required
                  />
                  <Field
                    label="Store Phone"
                    value={settings.storePhone}
                    onChange={(v) => updateField("storePhone", v)}
                    placeholder="Enter phone number"
                  />
                  <Field
                    label="Store Address"
                    value={settings.address}
                    onChange={(v) => updateField("address", v)}
                    placeholder="Enter store address"
                  />
                </div>
              </>
            )}

            {activeTab === "Profile" && (
              <>
                <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
                    {settings.adminName
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-gray-900">
                      {settings.adminName}
                    </h4>
                    <p className="text-sm text-gray-500">Store Administrator</p>
                  </div>
                  <Camera size={20} className="text-gray-400" />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    value={settings.adminName}
                    onChange={(v) => updateField("adminName", v)}
                    placeholder="Your full name"
                    required
                  />
                  <Field
                    label="Email Address"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(v) => updateField("adminEmail", v)}
                    placeholder="admin@example.com"
                    required
                  />
                </div>

                <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2 font-semibold text-gray-700">
                    <Mail size={17} />
                    Account email
                  </div>
                  <p className="mt-2">
                    Changing this field only updates the frontend demo. Connect
                    your authentication API to update the real account email.
                  </p>
                </div>
              </>
            )}

            {activeTab === "Notifications" && (
              <div className="divide-y divide-gray-100">
                <ToggleRow
                  title="Email Notifications"
                  description="Receive general store updates by email."
                  checked={settings.emailNotifications}
                  onChange={(v) => updateField("emailNotifications", v)}
                />
                <ToggleRow
                  title="New Order Alerts"
                  description="Get notified when a customer places an order."
                  checked={settings.orderNotifications}
                  onChange={(v) => updateField("orderNotifications", v)}
                />
                <ToggleRow
                  title="Low Stock Alerts"
                  description="Receive alerts when product inventory is low."
                  checked={settings.lowStockNotifications}
                  onChange={(v) => updateField("lowStockNotifications", v)}
                />
                <ToggleRow
                  title="Marketing Emails"
                  description="Receive promotional updates and product insights."
                  checked={settings.marketingEmails}
                  onChange={(v) => updateField("marketingEmails", v)}
                />
              </div>
            )}

            {activeTab === "Security" && (
              <>
                <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-4">
                  <LockKeyhole
                    size={21}
                    className="mt-0.5 shrink-0 text-amber-700"
                  />
                  <div>
                    <p className="font-semibold text-amber-900">
                      Protect your admin account
                    </p>
                    <p className="mt-1 text-sm text-amber-800">
                      Use a strong, unique password. Password changes require
                      backend authentication before they can take effect.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <Field
                    label="Current Password"
                    type="password"
                    value={settings.currentPassword}
                    onChange={(v) => updateField("currentPassword", v)}
                    placeholder="Enter current password"
                    autoComplete="current-password"
                  />
                  <Field
                    label="New Password"
                    type="password"
                    value={settings.newPassword}
                    onChange={(v) => updateField("newPassword", v)}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    minLength={8}
                  />
                  <Field
                    label="Confirm New Password"
                    type="password"
                    value={settings.confirmPassword}
                    onChange={(v) => updateField("confirmPassword", v)}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    minLength={8}
                  />
                </div>
              </>
            )}

            {message && (
              <div
                role="status"
                className={`flex items-start gap-2 rounded-xl p-3 text-sm ${
                  message.includes("match") ||
                  message.includes("Enter your current")
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                {message}
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={() => {
                setSettings(initialSettings);
                setMessage("");
              }}
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  minLength,
  autoComplete,
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </label>
  );
}

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0">
      <div>
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-red-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
