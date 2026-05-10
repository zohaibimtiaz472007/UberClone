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
  const {user, setUser} = useContext(userDataContext)

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
      
      console.log('User registered successfully:', data)

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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white p-10">
          <div>
            <h2 className="text-4xl font-semibold mb-4">Move with Uber</h2>
            <p className="text-slate-300 max-w-sm">
              Sign up and get a ride in minutes. See prices, compare cars, and pay seamlessly.
            </p>
          </div>
          <div className="space-y-3">
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Fast booking</p>
              <p className="mt-3 text-lg font-medium">Pickup in minutes.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Always available</p>
              <p className="mt-3 text-lg font-medium">24/7 support with every ride.</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <span className="inline-block text-2xl font-bold text-slate-900 mb-2">Uber</span>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">Create your account</h1>
            <p className="mt-3 text-slate-600">
              Join riders across the city with a fast and simple signup experience.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">First name</span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  placeholder="John"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Last name</span>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  placeholder="Doe"
                />
              </label>
            </div>

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
                minLength={6}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                placeholder="Create a password"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/user-login" className="font-semibold text-slate-900 hover:text-black">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup