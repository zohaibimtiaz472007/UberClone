import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        const data = response.data;

        localStorage.setItem("token", data.token);

        setMessage("Login successful");

        setFormData({
          email: "",
          password: "",
        });

        navigate("/user-dashboard");
      }
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-10">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1974&auto=format&fit=crop"
        alt="Map"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-black/40 to-slate-900/40 p-12 text-white">

          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Welcome <br /> Back
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
              Login and continue your ride-sharing journey with fast bookings,
              secure rides, and seamless travel experience.
            </p>
          </div>

          <div className="space-y-4">

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <h3 className="text-lg font-semibold">Book Anytime</h3>
              <p className="mt-1 text-sm text-slate-300">
                Instant rides available 24/7.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <h3 className="text-lg font-semibold">Safe Travel</h3>
              <p className="mt-1 text-sm text-slate-300">
                Trusted drivers with secure ride experience.
              </p>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-8 sm:p-10 lg:p-12">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-900">
              Sign In
            </h2>

            <p className="mt-3 text-slate-500">
              Access your account and continue your journey.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-black py-3.5 text-white font-semibold transition hover:bg-slate-800 disabled:opacity-70"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/user-signup"
              className="font-semibold text-black hover:underline"
            >
              Create Account
            </Link>
          </p>

          {/* Captain Login */}
          <div className="mt-8 border-t border-slate-200 pt-6">

            <p className="mb-4 text-center text-sm text-slate-600">
              Are you a driver?
            </p>

            <Link
              to="/captain-login"
              className="flex w-full items-center justify-center rounded-2xl border border-black py-3 font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Captain Login
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UserLogin;