// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { getUserCart, placeOrder } from "../api/api";

// const Checkout = () => {
//   const navigate = useNavigate();

//   const [cart, setCart] = useState([]);
//   const [deliveryMethod, setDeliveryMethod] = useState("standard");
//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   const userID = localStorage.getItem("userId");
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     addressLine: "",
//     city: "",
//     state: "",
//     postalCode: "",
//   });

//   const deliveryFee = deliveryMethod === "express" ? 99 : 40;
//   const freeDeliveryLimit = 499;
//   const actualDeliveryFee = cartTotal >= freeDeliveryLimit ? 0 : deliveryFee;

//   const finalTotal = cartTotal + actualDeliveryFee;

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     if (cart.length === 0) {
//       alert("Your cart is empty. Please add some products first.");
//       navigate("/products");
//       return;
//     }

//     setLoading(true);

//     // const orderId = `FR-${Date.now().toString().slice(-8)}`;

//     // Frontend demo only. No real payment or backend request.
//     // navigate("/order-success", {
//     //   state: {
//     //     orderId,
//     //     customer: formData,
//     //     items: cart,
//     //     subtotal: cartTotal,
//     //     deliveryFee: actualDeliveryFee,
//     //     total: finalTotal,
//     //     paymentMethod,
//     //     deliveryMethod,
//     //   },
//     // });
//     const res = await placeOrder(token, userID, formData);
//     if (res) {
//       alert("Order placed successful");
//       fetchUserCart();
//     }
//   };
//   useEffect(() => {
//     fetchUserCart();
//   }, []);
//   const subtotal = cart.reduce(
//     (total, item) => total + Number(item.totalPrice || 0),
//     0,
//   );
//   const fetchUserCart = async () => {
//     const data = await getUserCart(token, userID);
//     // debugger;
//     if (data) {
//       setCart(data);
//       syncCart(data);
//     }
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8faf4] px-4 text-center">
//         <div className="text-6xl">🛒</div>

//         <h1 className="mt-5 text-2xl font-bold text-gray-900">
//           Your cart is empty
//         </h1>

//         <p className="mt-2 text-gray-500">
//           Add some fresh products before checking out.
//         </p>

//         <Link
//           to="/product"
//           className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
//         >
//           Browse Products
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f8faf4]">
//       {/* Header */}
//       <header className="border-b border-gray-100 bg-white">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
//           <Link to="/product" className="text-2xl font-extrabold text-gray-900">
//             Fruits<span className="text-green-600">.</span>
//           </Link>

//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <span>🛡️</span>
//             <span>Secure checkout</span>
//           </div>
//         </div>
//       </header>

//       <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
//         {/* Page heading */}
//         <div className="mb-8">
//           <Link
//             to="/cart"
//             className="text-sm font-medium text-green-700 hover:text-green-800"
//           >
//             ← Back to cart
//           </Link>

//           <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//             Checkout
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Just a few details and your fresh order will be ready.
//           </p>
//         </div>

//         <form onSubmit={handlePlaceOrder}>
//           <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
//             {/* Left side: checkout form */}
//             <div className="space-y-6 lg:col-span-2">
//               {/* Delivery information */}
//               <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
//                 <div className="mb-6 flex items-center gap-3">
//                   <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
//                     📍
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-bold text-gray-900">
//                       Delivery Information
//                     </h2>
//                     <p className="text-sm text-gray-500">
//                       Where should we deliver your order?
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                   <div className="sm:col-span-2">
//                     <label className="mb-2 block text-sm font-semibold text-gray-700">
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       placeholder="Enter your full name"
//                       autoComplete="name"
//                       required
//                       className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
//                     />
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-gray-700">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="you@example.com"
//                       autoComplete="email"
//                       required
//                       className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
//                     />
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-gray-700">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="10-digit mobile number"
//                       autoComplete="tel"
//                       pattern="[6-9][0-9]{9}"
//                       title="Enter a valid 10-digit Indian mobile number"
//                       required
//                       className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
//                     />
//                   </div>

//                   <div className="sm:col-span-2">
//                     <label className="mb-2 block text-sm font-semibold text-gray-700">
//                       Street Address
//                     </label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       placeholder="House number, street, apartment..."
//                       autoComplete="street-address"
//                       rows={3}
//                       required
//                       className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
//                     />
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-gray-700">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       placeholder="Enter your city"
//                       autoComplete="address-level2"
//                       required
//                       className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
//                     />
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-gray-700">
//                       State
//                     </label>
//                     <input
//                       type="text"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleChange}
//                       placeholder="Enter your state"
//                       autoComplete="address-level1"
//                       required
//                       className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
//                     />
//                   </div>

//                   <div className="sm:col-span-2">
//                     <label className="mb-2 block text-sm font-semibold text-gray-700">
//                       PIN Code
//                     </label>
//                     <input
//                       type="text"
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleChange}
//                       placeholder="6-digit PIN code"
//                       autoComplete="postal-code"
//                       inputMode="numeric"
//                       pattern="[0-9]{6}"
//                       maxLength={6}
//                       required
//                       className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:max-w-xs"
//                     />
//                   </div>
//                 </div>
//               </section>

//               {/* Delivery method */}
//               <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
//                 <div className="mb-5 flex items-center gap-3">
//                   <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
//                     🚚
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-bold text-gray-900">
//                       Delivery Method
//                     </h2>
//                     <p className="text-sm text-gray-500">
//                       Choose how quickly you need your order.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <label
//                     className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 transition ${
//                       deliveryMethod === "standard"
//                         ? "border-green-500 bg-green-50"
//                         : "border-gray-200 hover:border-green-300"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <input
//                         type="radio"
//                         name="delivery"
//                         value="standard"
//                         checked={deliveryMethod === "standard"}
//                         onChange={() => setDeliveryMethod("standard")}
//                         className="h-4 w-4 accent-green-600"
//                       />
//                       <div>
//                         <p className="font-semibold text-gray-900">
//                           Standard Delivery
//                         </p>
//                         <p className="mt-1 text-sm text-gray-500">
//                           Estimated 2–3 days
//                         </p>
//                       </div>
//                     </div>
//                     <span className="text-sm font-bold text-gray-800">
//                       {cartTotal >= freeDeliveryLimit ? "FREE" : "₹40"}
//                     </span>
//                   </label>

//                   <label
//                     className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 transition ${
//                       deliveryMethod === "express"
//                         ? "border-green-500 bg-green-50"
//                         : "border-gray-200 hover:border-green-300"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <input
//                         type="radio"
//                         name="delivery"
//                         value="express"
//                         checked={deliveryMethod === "express"}
//                         onChange={() => setDeliveryMethod("express")}
//                         className="h-4 w-4 accent-green-600"
//                       />
//                       <div>
//                         <p className="font-semibold text-gray-900">
//                           Express Delivery
//                         </p>
//                         <p className="mt-1 text-sm text-gray-500">
//                           Estimated within 24 hours
//                         </p>
//                       </div>
//                     </div>
//                     <span className="text-sm font-bold text-gray-800">
//                       {cartTotal >= freeDeliveryLimit ? "FREE" : "₹99"}
//                     </span>
//                   </label>
//                 </div>

//                 {cartTotal < freeDeliveryLimit && (
//                   <p className="mt-4 text-sm text-green-700">
//                     Add ₹{(freeDeliveryLimit - cartTotal).toFixed(2)} more to
//                     qualify for free delivery.
//                   </p>
//                 )}
//               </section>

//               {/* Payment method */}
//               <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
//                 <div className="mb-5 flex items-center gap-3">
//                   <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
//                     💳
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-bold text-gray-900">
//                       Payment Method
//                     </h2>
//                     <p className="text-sm text-gray-500">
//                       Select your preferred payment option.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <label
//                     className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
//                       paymentMethod === "cod"
//                         ? "border-green-500 bg-green-50"
//                         : "border-gray-200 hover:border-green-300"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="payment"
//                       value="cod"
//                       checked={paymentMethod === "cod"}
//                       onChange={() => setPaymentMethod("cod")}
//                       className="h-4 w-4 accent-green-600"
//                     />
//                     <span className="text-2xl">💵</span>
//                     <div>
//                       <p className="font-semibold text-gray-900">
//                         Cash on Delivery
//                       </p>
//                       <p className="mt-1 text-sm text-gray-500">
//                         Pay when your order arrives.
//                       </p>
//                     </div>
//                   </label>

//                   <label
//                     className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
//                       paymentMethod === "online"
//                         ? "border-green-500 bg-green-50"
//                         : "border-gray-200 hover:border-green-300"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="payment"
//                       value="online"
//                       checked={paymentMethod === "online"}
//                       onChange={() => setPaymentMethod("online")}
//                       className="h-4 w-4 accent-green-600"
//                     />
//                     <span className="text-2xl">📱</span>
//                     <div>
//                       <p className="font-semibold text-gray-900">
//                         Online Payment
//                       </p>
//                       <p className="mt-1 text-sm text-gray-500">
//                         Demo option only — no real payment.
//                       </p>
//                     </div>
//                   </label>
//                 </div>
//               </section>
//             </div>

//             {/* Right side: order summary */}
//             <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-6">
//               <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 {cart.reduce((sum, item) => sum + item.quantity, 0)} items in
//                 your order
//               </p>

//               <div className="mt-6 max-h-80 space-y-4 overflow-y-auto">
//                 {cart.map((item) => (
//                   <div key={item.id} className="flex gap-3">
//                     <div className="relative shrink-0">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="h-16 w-16 rounded-xl bg-gray-50 object-cover"
//                       />
//                       <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-700 px-1 text-xs font-bold text-white">
//                         {item.quantity}
//                       </span>
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <p className="line-clamp-2 text-sm font-semibold text-gray-900">
//                         {item.name}
//                       </p>
//                       <p className="mt-1 text-xs text-gray-500">
//                         ₹{Number(item.price).toFixed(2)} / {item.unit}
//                       </p>
//                     </div>

//                     <p className="whitespace-nowrap text-sm font-bold text-gray-900">
//                       ₹{(Number(item.price) * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="my-6 border-t border-dashed border-gray-200" />

//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between gap-3 text-gray-600">
//                   <span>Subtotal</span>
//                   <span className="font-medium text-gray-900">
//                     ₹{cartTotal.toFixed(2)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between gap-3 text-gray-600">
//                   <span>Delivery Fee</span>
//                   <span className="font-medium text-gray-900">
//                     {actualDeliveryFee === 0
//                       ? "FREE"
//                       : `₹${actualDeliveryFee.toFixed(2)}`}
//                   </span>
//                 </div>

//                 <div className="flex justify-between gap-3 text-gray-600">
//                   <span>Discount</span>
//                   <span className="font-medium text-green-700">₹0.00</span>
//                 </div>
//               </div>

//               <div className="my-5 border-t border-gray-200" />

//               <div className="flex items-center justify-between gap-3">
//                 <span className="text-base font-bold text-gray-900">
//                   Total Amount
//                 </span>
//                 <span className="text-2xl font-extrabold text-green-700">
//                   ₹{finalTotal.toFixed(2)}
//                 </span>
//               </div>

//               <p className="mt-2 text-xs text-gray-400">
//                 Inclusive of displayed prices. Demo pricing only.
//               </p>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="mt-6 w-full rounded-xl bg-green-600 px-5 py-4 font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading
//                   ? "Processing..."
//                   : `Place Order · ₹${finalTotal.toFixed(2)}`}
//               </button>

//               <p className="mt-4 text-center text-xs leading-5 text-gray-400">
//                 By placing your order, you agree to our terms and conditions.
//                 This is a frontend demo; no actual order or payment is made.
//               </p>
//             </aside>
//           </div>
//         </form>
//       </main>

//       <footer className="border-t border-gray-100 bg-white py-6 text-center text-sm text-gray-400">
//         © {new Date().getFullYear()} Fruits. Freshness delivered with care.
//       </footer>
//     </div>
//   );
// };

// export default Checkout;

// customerScreen.java
// import { useMemo, useState } from "react";
// import {
//   Search,
//   Users,
//   UserCheck,
//   UserX,
//   ShoppingBag,
//   Eye,
//   X,
//   Mail,
//   MapPin,
//   Phone,
// } from "lucide-react";

// const initialCustomers = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     email: "rahul@example.com",
//     phone: "+91 98765 43210",
//     address: "Indiranagar, Bengaluru",
//     joined: "2026-08-12",
//     orders: 8,
//     spent: 3240,
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Priya Das",
//     email: "priya@example.com",
//     phone: "+91 98765 12340",
//     address: "Whitefield, Bengaluru",
//     joined: "2026-08-20",
//     orders: 5,
//     spent: 2180,
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Amit Kumar",
//     email: "amit@example.com",
//     phone: "+91 91234 56780",
//     address: "Koramangala, Bengaluru",
//     joined: "2026-09-02",
//     orders: 3,
//     spent: 950,
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "Sneha Roy",
//     email: "sneha@example.com",
//     phone: "+91 99887 76655",
//     address: "Jayanagar, Bengaluru",
//     joined: "2026-09-10",
//     orders: 12,
//     spent: 5870,
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "David Lal",
//     email: "david@example.com",
//     phone: "+91 90909 80808",
//     address: "Electronic City, Bengaluru",
//     joined: "2026-09-15",
//     orders: 1,
//     spent: 450,
//     status: "Inactive",
//   },
//   {
//     id: 6,
//     name: "Ananya Singh",
//     email: "ananya@example.com",
//     phone: "+91 90000 11122",
//     address: "HSR Layout, Bengaluru",
//     joined: "2026-10-01",
//     orders: 6,
//     spent: 2760,
//     status: "Active",
//   },
// ];

// const formatCurrency = (amount) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amount);

// export default function CustomerScreen() {
//   const [customers, setCustomers] = useState(initialCustomers);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   const filteredCustomers = useMemo(() => {
//     return customers.filter((customer) => {
//       const matchesSearch = [customer.name, customer.email, customer.phone]
//         .join(" ")
//         .toLowerCase()
//         .includes(search.toLowerCase());

//       const matchesStatus =
//         statusFilter === "All" || customer.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [customers, search, statusFilter]);

//   const activeCount = customers.filter(
//     (customer) => customer.status === "Active",
//   ).length;

//   const totalSpent = customers.reduce(
//     (sum, customer) => sum + customer.spent,
//     0,
//   );

//   const totalOrders = customers.reduce(
//     (sum, customer) => sum + customer.orders,
//     0,
//   );

//   const toggleCustomerStatus = (id) => {
//     setCustomers((current) =>
//       current.map((customer) =>
//         customer.id === id
//           ? {
//               ...customer,
//               status: customer.status === "Active" ? "Inactive" : "Active",
//             }
//           : customer,
//       ),
//     );

//     setSelectedCustomer((current) =>
//       current?.id === id
//         ? {
//             ...current,
//             status: current.status === "Active" ? "Inactive" : "Active",
//           }
//         : current,
//     );
//   };

//   return (
//     <div className="space-y-7">
//       {/* Page heading */}
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
//         <p className="mt-1 text-sm text-gray-500">
//           View customer profiles and manage customer status.
//         </p>
//       </div>

//       {/* Summary cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         <SummaryCard
//           label="Total Customers"
//           value={customers.length}
//           icon={Users}
//           iconStyle="bg-red-50 text-red-600"
//         />

//         <SummaryCard
//           label="Active Customers"
//           value={activeCount}
//           icon={UserCheck}
//           iconStyle="bg-green-50 text-green-600"
//         />

//         <SummaryCard
//           label="Inactive Customers"
//           value={customers.length - activeCount}
//           icon={UserX}
//           iconStyle="bg-gray-100 text-gray-600"
//         />

//         <SummaryCard
//           label="Total Orders"
//           value={totalOrders}
//           icon={ShoppingBag}
//           iconStyle="bg-blue-50 text-blue-600"
//         />
//       </div>

//       {/* Customer table */}
//       <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
//         <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h3 className="font-bold text-gray-900">All Customers</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Manage customer profiles and account status.
//             </p>
//           </div>

//           <div className="flex flex-col gap-3 sm:flex-row">
//             <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-red-400">
//               <Search size={18} className="text-gray-400" />
//               <input
//                 type="search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search customers..."
//                 aria-label="Search customers"
//                 className="min-w-0 bg-transparent text-sm outline-none sm:w-52"
//               />
//             </div>

//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               aria-label="Filter customers by status"
//               className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-400"
//             >
//               <option value="All">All customers</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[900px] text-left">
//             <thead className="bg-gray-50">
//               <tr className="text-xs uppercase tracking-wider text-gray-500">
//                 <th className="px-5 py-4">Customer</th>
//                 <th className="px-5 py-4">Phone</th>
//                 <th className="px-5 py-4">Joined Date</th>
//                 <th className="px-5 py-4">Orders</th>
//                 <th className="px-5 py-4">Total Spent</th>
//                 <th className="px-5 py-4">Status</th>
//                 <th className="px-5 py-4 text-right">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-100">
//               {filteredCustomers.map((customer) => (
//                 <tr key={customer.id} className="hover:bg-gray-50">
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 font-bold text-red-600">
//                         {customer.name
//                           .split(" ")
//                           .map((part) => part[0])
//                           .slice(0, 2)
//                           .join("")
//                           .toUpperCase()}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-900">
//                           {customer.name}
//                         </p>
//                         <p className="mt-1 text-xs text-gray-500">
//                           {customer.email}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-5 py-4 text-sm text-gray-600">
//                     {customer.phone}
//                   </td>

//                   <td className="px-5 py-4 text-sm text-gray-600">
//                     {customer.joined}
//                   </td>

//                   <td className="px-5 py-4 font-semibold text-gray-800">
//                     {customer.orders}
//                   </td>

//                   <td className="px-5 py-4 font-semibold text-gray-900">
//                     {formatCurrency(customer.spent)}
//                   </td>

//                   <td className="px-5 py-4">
//                     <button
//                       type="button"
//                       onClick={() => toggleCustomerStatus(customer.id)}
//                       title="Click to change customer status"
//                       className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
//                         customer.status === "Active"
//                           ? "bg-green-50 text-green-700"
//                           : "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       <span className="mr-1.5">●</span>
//                       {customer.status}
//                     </button>
//                   </td>

//                   <td className="px-5 py-4 text-right">
//                     <button
//                       type="button"
//                       onClick={() => setSelectedCustomer(customer)}
//                       aria-label={`View ${customer.name}`}
//                       className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
//                     >
//                       <Eye size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {filteredCustomers.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="px-5 py-14 text-center">
//                     <Users size={36} className="mx-auto text-gray-300" />
//                     <p className="mt-3 font-semibold text-gray-800">
//                       No customers found
//                     </p>
//                     <p className="mt-1 text-sm text-gray-500">
//                       Try another search or status filter.
//                     </p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
//           Showing {filteredCustomers.length} of {customers.length} customers
//         </div>
//       </section>

//       {/* Customer details modal */}
//       {selectedCustomer && (
//         <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/40 p-4">
//           <div
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="customer-detail-title"
//             className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
//           >
//             <div className="flex items-center justify-between border-b p-5">
//               <h3 id="customer-detail-title" className="text-xl font-bold">
//                 Customer Details
//               </h3>
//               <button
//                 type="button"
//                 onClick={() => setSelectedCustomer(null)}
//                 aria-label="Close customer details"
//                 className="rounded-lg p-2 hover:bg-gray-100"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="p-6">
//               <div className="flex flex-col items-center rounded-2xl bg-red-50 p-6">
//                 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold text-red-600 shadow-sm">
//                   {selectedCustomer.name
//                     .split(" ")
//                     .map((part) => part[0])
//                     .slice(0, 2)
//                     .join("")
//                     .toUpperCase()}
//                 </div>
//                 <h4 className="mt-3 text-xl font-bold text-gray-900">
//                   {selectedCustomer.name}
//                 </h4>
//                 <span
//                   className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${
//                     selectedCustomer.status === "Active"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {selectedCustomer.status}
//                 </span>
//               </div>

//               <div className="mt-6 space-y-4">
//                 <DetailRow
//                   icon={Mail}
//                   label="Email"
//                   value={selectedCustomer.email}
//                 />
//                 <DetailRow
//                   icon={Phone}
//                   label="Phone"
//                   value={selectedCustomer.phone}
//                 />
//                 <DetailRow
//                   icon={MapPin}
//                   label="Address"
//                   value={selectedCustomer.address}
//                 />
//               </div>

//               <div className="mt-6 grid grid-cols-2 gap-3">
//                 <div className="rounded-xl border border-gray-200 p-4">
//                   <p className="text-sm text-gray-500">Total Orders</p>
//                   <p className="mt-1 text-xl font-bold">
//                     {selectedCustomer.orders}
//                   </p>
//                 </div>
//                 <div className="rounded-xl border border-gray-200 p-4">
//                   <p className="text-sm text-gray-500">Total Spent</p>
//                   <p className="mt-1 text-xl font-bold text-green-700">
//                     {formatCurrency(selectedCustomer.spent)}
//                   </p>
//                 </div>
//               </div>

//               <p className="mt-4 text-sm text-gray-500">
//                 Customer since: {selectedCustomer.joined}
//               </p>

//               <button
//                 type="button"
//                 onClick={() => toggleCustomerStatus(selectedCustomer.id)}
//                 className="mt-5 w-full rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
//               >
//                 {selectedCustomer.status === "Active"
//                   ? "Deactivate Customer"
//                   : "Activate Customer"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="rounded-2xl border border-gray-200 bg-white p-5">
//         <p className="text-sm text-gray-500">Total customer spending</p>
//         <p className="mt-1 text-2xl font-bold text-gray-900">
//           {formatCurrency(totalSpent)}
//         </p>
//       </div>
//     </div>
//   );
// }

// function SummaryCard({ label, value, icon: Icon, iconStyle }) {
//   return (
//     <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5">
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
//       </div>
//       <div className={`rounded-xl p-3 ${iconStyle}`}>
//         <Icon size={24} />
//       </div>
//     </div>
//   );
// }

// function DetailRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-start gap-3">
//       <div className="rounded-lg bg-gray-100 p-2 text-gray-600">
//         <Icon size={18} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-xs text-gray-500">{label}</p>
//         <p className="mt-1 break-words text-sm font-medium text-gray-900">
//           {value}
//         </p>
//       </div>
//     </div>
//   );
// }

// import {
//   Package,
//   ShoppingCart,
//   Users,
//   IndianRupee,
//   ArrowUpRight,
//   MoreHorizontal,
// } from "lucide-react";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   CartesianGrid,
//   Tooltip,
//   XAxis,
// } from "recharts";
// import StatCard from "../components/AdminStatCard";
// import { useEffect, useState } from "react";
// import { getDashboardData } from "../api/api";

// const salesData = [
//   { day: "Mon", sales: 4200 },
//   { day: "Tue", sales: 5800 },
//   { day: "Wed", sales: 4900 },
//   { day: "Thu", sales: 7600 },
//   { day: "Fri", sales: 6200 },
//   { day: "Sat", sales: 9100 },
//   { day: "Sun", sales: 8200 },
// ];

// const orders = [
//   {
//     id: "#FB1001",
//     customer: "Rahul Sharma",
//     product: "Fresh Apples",
//     amount: 650,
//     status: "Delivered",
//   },
//   {
//     id: "#FB1002",
//     customer: "Priya Singh",
//     product: "Sweet Mangoes",
//     amount: 420,
//     status: "Processing",
//   },
//   {
//     id: "#FB1003",
//     customer: "Amit Kumar",
//     product: "Fresh Bananas",
//     amount: 180,
//     status: "Pending",
//   },
//   {
//     id: "#FB1004",
//     customer: "Sneha Das",
//     product: "Green Grapes",
//     amount: 350,
//     status: "Delivered",
//   },
// ];

// const statusStyles = {
//   Delivered: "bg-green-50 text-green-700",
//   Processing: "bg-blue-50 text-blue-700",
//   Pending: "bg-orange-50 text-orange-700",
// };

// export default function Dashboard() {
//   const token = localStorage.getItem("token");
//   const [allData, setAllData] = useState([]);
//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     const res = await getDashboardData(token);
//     if (res) {
//       setAllData(res);
//     }
//   };

//   console.log(allData);
//   return (
//     <div className="space-y-7">
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             Dashboard Overview
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Here's what's happening with your store today.
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         <StatCard
//           title="Total Revenue"
//           value="₹84,250"
//           change="+12.5%"
//           icon={IndianRupee}
//           color="red"
//         />
//         <StatCard
//           title="Total Orders"
//           value="1,284"
//           change="+8.2%"
//           icon={ShoppingCart}
//           color="orange"
//         />
//         <StatCard
//           title="Total Products"
//           value="156"
//           change="+4.6%"
//           icon={Package}
//           color="blue"
//         />
//         <StatCard
//           title="Total Customers"
//           value="892"
//           change="+10.3%"
//           icon={Users}
//           color="green"
//         />
//       </div>

//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
//         <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 xl:col-span-2">
//           <div className="mb-6 flex items-center justify-between">
//             <div>
//               <h2 className="font-bold text-gray-900">Sales Overview</h2>
//               <p className="mt-1 text-sm text-gray-500">
//                 Weekly sales performance
//               </p>
//             </div>
//             <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600">
//               This Week
//             </button>
//           </div>

//           <div className="h-64 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={salesData}>
//                 <defs>
//                   <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#dc2626" stopOpacity={0.25} />
//                     <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   vertical={false}
//                   stroke="#eeeeee"
//                 />
//                 <XAxis dataKey="day" axisLine={false} tickLine={false} />
//                 <Tooltip formatter={(value) => [`₹${value}`, "Sales"]} />
//                 <Area
//                   type="monotone"
//                   dataKey="sales"
//                   stroke="#dc2626"
//                   strokeWidth={3}
//                   fill="url(#salesFill)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </section>

//         <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="font-bold text-gray-900">Inventory Summary</h2>
//               <p className="mt-1 text-sm text-gray-500">Stock at a glance</p>
//             </div>
//             <MoreHorizontal size={22} className="text-gray-400" />
//           </div>

//           <div className="mt-7 space-y-6">
//             {[
//               {
//                 label: "Total Products",
//                 value: 156,
//                 percent: "100%",
//                 width: "100%",
//                 color: "bg-red-500",
//               },
//               {
//                 label: "In Stock",
//                 value: 128,
//                 percent: "82%",
//                 width: "82%",
//                 color: "bg-green-500",
//               },
//               {
//                 label: "Low Stock",
//                 value: 18,
//                 percent: "12%",
//                 width: "12%",
//                 color: "bg-orange-500",
//               },
//               {
//                 label: "Out of Stock",
//                 value: 10,
//                 percent: "6%",
//                 width: "6%",
//                 color: "bg-gray-400",
//               },
//             ].map((item) => (
//               <div key={item.label}>
//                 <div className="mb-2 flex items-center justify-between text-sm">
//                   <span className="text-gray-600">{item.label}</span>
//                   <span className="font-semibold text-gray-900">
//                     {item.value}
//                   </span>
//                 </div>
//                 <div className="h-2 overflow-hidden rounded-full bg-gray-100">
//                   <div
//                     className={`h-full rounded-full ${item.color}`}
//                     style={{ width: item.width }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>

//       <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
//         <div className="flex items-center justify-between border-b border-gray-100 p-5 sm:p-6">
//           <div>
//             <h2 className="font-bold text-gray-900">Recent Orders</h2>
//             <p className="mt-1 text-sm text-gray-500">
//               Latest customer purchases
//             </p>
//           </div>
//           <button className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700">
//             View all <ArrowUpRight size={16} />
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[650px] text-left text-sm">
//             <thead className="bg-gray-50 text-xs uppercase text-gray-500">
//               <tr>
//                 <th className="px-6 py-4 font-semibold">Order ID</th>
//                 <th className="px-6 py-4 font-semibold">Customer</th>
//                 <th className="px-6 py-4 font-semibold">Product</th>
//                 <th className="px-6 py-4 font-semibold">Amount</th>
//                 <th className="px-6 py-4 font-semibold">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 font-semibold text-gray-900">
//                     {order.id}
//                   </td>
//                   <td className="px-6 py-4 text-gray-600">{order.customer}</td>
//                   <td className="px-6 py-4 text-gray-600">{order.product}</td>
//                   <td className="px-6 py-4 font-semibold text-gray-900">
//                     ₹{order.amount.toLocaleString("en-IN")}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[order.status]}`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </div>
//   );
// }
