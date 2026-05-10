import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

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
        },
      );

      if (response.status === 200) {
        const data = response.data;

        console.log("Login successful:", data);

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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="mb-8">
          <span className="inline-block text-2xl font-bold text-slate-900 mb-2">
            Uber
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-3 text-slate-600">
            Sign in to continue your journey.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/user-signup"
            className="font-semibold text-slate-900 hover:text-black"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
