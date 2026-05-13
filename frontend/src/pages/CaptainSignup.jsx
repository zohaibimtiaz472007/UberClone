import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    vehicleColor: "",
    vehicleNumber: "",
    capacity: "",
    vehicleType: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { setCaptain } = useContext(CaptainDataContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const newCaptain = {
        fullname: {
          firstname: formData.firstName,
          lastname: formData.lastName,
        },

        email: formData.email,

        password: formData.password,

        vehicle: {
          color: formData.vehicleColor,
          plate: formData.vehicleNumber,
          capacity: Number(formData.capacity),
          vehicleType: formData.vehicleType,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newCaptain
      );

      if (response.status === 201) {
        const data = response.data;

        setCaptain(data.captain);

        localStorage.setItem("token", data.token);

        setMessage("Captain account created successfully");

        navigate("/captain-dashboard");
      }
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-10">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2070&auto=format&fit=crop"
        alt="Captain Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-black/40 to-slate-900/40 p-12 text-white">

          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Drive & <br /> Earn More
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
              Become a captain and start earning with flexible rides,
              real-time bookings, and a modern driver platform.
            </p>
          </div>

          <div className="space-y-4">

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <h3 className="text-lg font-semibold">Flexible Schedule</h3>
              <p className="mt-1 text-sm text-slate-300">
                Drive anytime and manage your own hours.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <h3 className="text-lg font-semibold">More Earnings</h3>
              <p className="mt-1 text-sm text-slate-300">
                Accept rides instantly and grow your income.
              </p>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-8 sm:p-10 lg:p-12 overflow-y-auto max-h-screen">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-900">
              Captain Signup
            </h2>

            <p className="mt-3 text-slate-500">
              Create your captain account and start driving today.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium text-slate-700">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>

            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="captain@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
              />
            </div>

            {/* Vehicle Number & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Vehicle Number
                </label>

                <input
                  type="text"
                  name="vehicleNumber"
                  placeholder="ABC-123"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Vehicle Type
                </label>

                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                >
                  <option value="">Select Type</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

            </div>

            {/* Vehicle Color & Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Vehicle Color
                </label>

                <input
                  type="text"
                  name="vehicleColor"
                  placeholder="Black"
                  value={formData.vehicleColor}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Capacity
                </label>

                <input
                  type="number"
                  name="capacity"
                  placeholder="4"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>

            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-black py-3.5 text-white font-semibold transition hover:bg-slate-800 disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Captain Account"}
            </button>

          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/captain-login"
              className="font-semibold text-black hover:underline"
            >
              Login
            </Link>
          </p>

          {/* User Signup */}
          <div className="mt-8 border-t border-slate-200 pt-6">

            <p className="mb-4 text-center text-sm text-slate-600">
              Want to ride instead?
            </p>

            <Link
              to="/user-signup"
              className="flex w-full items-center justify-center rounded-2xl border border-black py-3 font-semibold text-black transition hover:bg-black hover:text-white"
            >
              User Signup
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;