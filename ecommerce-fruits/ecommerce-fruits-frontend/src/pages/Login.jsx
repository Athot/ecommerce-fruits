import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await login({ email, password });

      // Remember or forget the email based on the checkbox
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("token", response.token);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      console.log("Login successful:", response);
      navigate("/product");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf4] px-5 py-6 sm:px-8 lg:px-14">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-2xl">
              🍃
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Fruits<span className="text-green-600">.</span>
            </span>
          </a>

          <span className="hidden text-sm text-gray-500 sm:block">
            Freshness delivered to your door
          </span>
        </header>

        {/* Main Content */}
        <main className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Hero Section */}
          <section className="flex flex-col justify-center">
            <div className="mb-5 w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              🍓 Fresh • Natural • Delicious
            </div>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Find your best <span className="text-green-600">fruits.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
              Discover nature's sweetest picks. Choose your favorite fruits and
              enjoy freshness delivered straight to your doorstep.
            </p>

            {/* Fruit Visual */}
            <div className="relative mt-10 flex min-h-64 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-green-100 via-yellow-50 to-orange-100 p-6 sm:min-h-80">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-yellow-200/50 blur-2xl" />
              <div className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-green-300/40 blur-2xl" />

              <div className="relative grid grid-cols-3 items-center gap-3 text-6xl sm:gap-5 sm:text-7xl">
                <span className="-rotate-12">🍊</span>
                <span className="translate-y-3 scale-125">🍎</span>
                <span className="rotate-12">🥑</span>
                <span className="translate-x-3 rotate-12">🍓</span>
                <span className="-translate-y-2">🍇</span>
                <span className="-translate-x-2 -rotate-12">🥭</span>
              </div>

              <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                <p className="text-sm font-bold text-gray-900">
                  Nature's goodness
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  A little freshness every day
                </p>
              </div>
            </div>
          </section>

          {/* Right: Sign In Form */}
          <section className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-green-900/5 sm:p-9">
              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
                  Welcome back
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Sign in
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Enter your details to continue shopping.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        console.log("Connect forgot-password flow")
                      }
                      className="text-sm font-medium text-green-700 hover:text-green-800"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-16 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-green-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 accent-green-600"
                  />
                  Remember me
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700 active:translate-y-0"
                >
                  Sign in
                  <span aria-hidden="true">→</span>
                </button>
              </form>
              {errorMessage && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {errorMessage}
                </p>
              )}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400">
                  FRESHNESS STARTS HERE
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <p className="text-center text-sm leading-6 text-gray-500">
                Sign in to manage your orders and discover your favorites.
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Fruits. Freshness in every bite.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Login;
