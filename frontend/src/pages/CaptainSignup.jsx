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

  const { captain, setCaptain } = useContext(CaptainDataContext);

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
        newCaptain,
      );

      if (response.status === 201) {
        const data = response.data;

        console.log("Captain registered successfully:", data);

        setCaptain(data.captain);

        localStorage.setItem("token", data.token);

        setMessage("Captain account created successfully");

        navigate("/");
      }
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "Signup failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Captain Signup</h1>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
            minLength={3}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
            minLength={3}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
            minLength={6}
          />

          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />

          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          >
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
          </select>

          <input
            type="text"
            name="vehicleColor"
            placeholder="Vehicle Color"
            value={formData.vehicleColor}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Vehicle Capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
            min="1"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
