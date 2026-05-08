import React, { useState } from 'react';
import {
  Menu,
  X,
  Globe,
  User,
  ChevronDown,
  Shield,
  Clock,
  CreditCard,
  MapPin,
  Briefcase,
  Star,
  Headphones,
  Car,
  Bike,
  Package,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-black text-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold tracking-tight">UBER</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium hover:text-gray-300 transition">Ride</a>
              <a href="#" className="text-sm font-medium hover:text-gray-300 transition">Drive</a>
              <a href="#" className="text-sm font-medium hover:text-gray-300 transition">Business</a>
              <a href="#" className="text-sm font-medium hover:text-gray-300 transition">About</a>
              <button className="flex items-center gap-1 text-sm font-medium hover:text-gray-300 transition">
                <Globe size={16} />
                <span>EN</span>
              </button>
              <button className="flex items-center gap-1 text-sm font-medium hover:text-gray-300 transition">
                <User size={16} />
                <span>Sign in</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-4 py-3 space-y-3">
              <a href="#" className="block text-sm font-medium hover:text-gray-300 transition">Ride</a>
              <a href="#" className="block text-sm font-medium hover:text-gray-300 transition">Drive</a>
              <a href="#" className="block text-sm font-medium hover:text-gray-300 transition">Business</a>
              <a href="#" className="block text-sm font-medium hover:text-gray-300 transition">About</a>
              <button className="flex items-center gap-1 text-sm font-medium hover:text-gray-300 transition">
                <Globe size={16} />
                <span>EN</span>
              </button>
              <button className="flex items-center gap-1 text-sm font-medium hover:text-gray-300 transition">
                <User size={16} />
                <span>Sign in</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 bg-black">
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Uber car in city"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Get Started with Uber
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                Move your way. Request a ride, order food, rent a car, or book a courier — all in one app.
              </p>
              
              {/* Continue Button */}
              <Link to="/user-signup" className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg">
                Continue
              </Link>

              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <Shield size={20} />
                  <span className="text-sm">Safe rides</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock size={20} />
                  <span className="text-sm">24/7 support</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CreditCard size={20} />
                  <span className="text-sm">Cashless payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Uber Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
            How Uber works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Request a ride</h3>
              <p className="text-gray-600">Open the app and enter your destination</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Get matched</h3>
              <p className="text-gray-600">We'll connect you with a nearby driver</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Enjoy your ride</h3>
              <p className="text-gray-600">Track your trip and pay seamlessly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
            Our services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
              <Car size={40} className="text-black mb-4" />
              <h3 className="text-lg font-bold mb-2">UberX</h3>
              <p className="text-gray-600 text-sm">Affordable everyday rides</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
              <Bike size={40} className="text-black mb-4" />
              <h3 className="text-lg font-bold mb-2">Uber Moto</h3>
              <p className="text-gray-600 text-sm">Fast & budget-friendly</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
              <Package size={40} className="text-black mb-4" />
              <h3 className="text-lg font-bold mb-2">Uber Package</h3>
              <p className="text-gray-600 text-sm">Send packages easily</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
              <Building2 size={40} className="text-black mb-4" />
              <h3 className="text-lg font-bold mb-2">Uber Business</h3>
              <p className="text-gray-600 text-sm">Corporate travel solution</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Shield size={48} className="mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Safety is our priority
              </h2>
              <p className="text-gray-300 mb-6">
                Every ride is covered by our comprehensive safety guidelines, 24/7 support, and real-time monitoring.
              </p>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                Learn more
              </button>
            </div>
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1557425955-df376b88c6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Safety first"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Uber app on phone"
                className="rounded-xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Download the Uber app
              </h2>
              <p className="text-gray-600 mb-6">
                Get the app on your phone and start moving. Available on iOS and Android.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                  App Store
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Headphones size={48} className="mx-auto mb-6 text-black" />
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Need help? We're here
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Contact Support
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-2xl font-bold tracking-tight">UBER</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About us</a></li>
                <li><a href="#" className="hover:text-white transition">Our offerings</a></li>
                <li><a href="#" className="hover:text-white transition">Newsroom</a></li>
                <li><a href="#" className="hover:text-white transition">Investors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Ride</a></li>
                <li><a href="#" className="hover:text-white transition">Drive</a></li>
                <li><a href="#" className="hover:text-white transition">Deliver</a></li>
                <li><a href="#" className="hover:text-white transition">Eat</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Help center</a></li>
                <li><a href="#" className="hover:text-white transition">Safety</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow us</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Uber Technologies Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;