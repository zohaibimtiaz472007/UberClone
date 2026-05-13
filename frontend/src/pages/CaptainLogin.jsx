import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {

  const navigate = useNavigate()

  const { setCaptain } = useContext(CaptainDataContext)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

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

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        {
          email: formData.email,
          password: formData.password
        }
      )

      if (response.status === 200) {

        const data = response.data

        setCaptain(data.captain)

        localStorage.setItem('token', data.token)

        localStorage.setItem(
          'captain',
          JSON.stringify(data.captain)
        )

        setMessage('Login successful')

        setFormData({
          email: '',
          password: ''
        })

        navigate('/captain-dashboard')
      }

    } catch (err) {

      console.log(err)

      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Login failed'
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-10">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop"
        alt="Captain Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-black/40 to-slate-900/40 p-12 text-white">

          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Welcome <br /> Captain
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
              Login and continue earning with real-time ride requests,
              flexible schedules, and a modern driver experience.
            </p>
          </div>

          <div className="space-y-4">

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <h3 className="text-lg font-semibold">
                Instant Ride Requests
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                Accept rides instantly and stay active.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <h3 className="text-lg font-semibold">
                Earn More
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                Drive anytime and maximize your earnings.
              </p>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-8 sm:p-10 lg:p-12">

          {/* Header */}
          <div className="mb-8">

            <h2 className="text-4xl font-bold text-slate-900">
              Captain Login
            </h2>

            <p className="mt-3 text-slate-500">
              Sign in to continue driving with your captain account.
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
                placeholder="captain@example.com"
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
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

          </form>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have a captain account?{' '}

            <Link
              to="/captain-signup"
              className="font-semibold text-black hover:underline"
            >
              Create Account
            </Link>

          </p>

          {/* User Login */}
          <div className="mt-8 border-t border-slate-200 pt-6">

            <p className="mb-4 text-center text-sm text-slate-600">
              Looking for a ride instead?
            </p>

            <Link
              to="/user-login"
              className="flex w-full items-center justify-center rounded-2xl border border-black py-3 font-semibold text-black transition hover:bg-black hover:text-white"
            >
              User Login
            </Link>

          </div>

        </div>
      </div>
    </div>
  )
}

export default CaptainLogin