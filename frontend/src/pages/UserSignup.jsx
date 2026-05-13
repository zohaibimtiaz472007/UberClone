import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'

const UserSignup = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastname: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { setUser } = useContext(userDataContext)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setMessage('')
    setLoading(true)

    try {
      const newUser = {
        fullname: {
          firstName: formData.firstName,
          lastname: formData.lastname,
        },
        email: formData.email,
        password: formData.password
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      )

      if (response.status === 201) {
        const data = response.data

        setUser(data.user)
        localStorage.setItem('token', data.token)

        setMessage('Account created successfully')

        setFormData({
          firstName: '',
          lastname: '',
          email: '',
          password: ''
        })

        navigate('/user-dashboard')
      }

    } catch (err) {
      console.log(err)

      setError(
        err.response?.data?.message ||
        'Signup failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4 py-10">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1974&auto=format&fit=crop"
        alt="Map"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 text-white bg-gradient-to-br from-black/40 to-slate-900/40">

          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Ride Across <br /> Pakistan
            </h1>

            <p className="mt-6 text-slate-300 text-lg max-w-md leading-relaxed">
              Fast rides, secure payments, and seamless travel experience
              powered by your modern Uber Clone platform.
            </p>
          </div>

          <div className="space-y-4">

            <div className="rounded-2xl bg-white/10 p-5 border border-white/10">
              <h3 className="text-lg font-semibold">Fast Booking</h3>
              <p className="text-sm text-slate-300 mt-1">
                Book your ride within seconds anytime.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 border border-white/10">
              <h3 className="text-lg font-semibold">Safe & Secure</h3>
              <p className="text-sm text-slate-300 mt-1">
                Trusted drivers and secure ride experience.
              </p>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-8 sm:p-10 lg:p-12">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-900">
              Create Account
            </h2>

            <p className="mt-3 text-slate-500">
              Start your journey with a modern ride-sharing experience.
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium text-slate-700">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  minLength={3}
                  placeholder="John"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  minLength={3}
                  placeholder="Doe"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>

            </div>

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
                minLength={6}
                placeholder="Create password"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-black py-3.5 text-white font-semibold transition hover:bg-slate-800 disabled:opacity-70"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link
              to="/user-login"
              className="font-semibold text-black hover:underline"
            >
              Login
            </Link>
          </p>

          {/* Captain Signup */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-center text-sm text-slate-600 mb-4">
              Want to drive and earn with us?
            </p>

            <Link
              to="/captain-signup"
              className="flex items-center justify-center w-full rounded-2xl border border-black py-3 font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Become a Captain
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserSignup