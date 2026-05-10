import React from 'react'

const HistoryTab = () => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const rides = [
    { id: 2847, distance: 8.5, duration: 25, fare: 250, daysAgo: 0, customer: "Rajesh K.", rating: 4.9 },
    { id: 2846, distance: 12.3, duration: 35, fare: 380, daysAgo: 1, customer: "Priya S.", rating: 5.0 },
    { id: 2845, distance: 5.2, duration: 15, fare: 150, daysAgo: 1, customer: "Amit V.", rating: 4.8 },
    { id: 2844, distance: 15.8, duration: 45, fare: 450, daysAgo: 2, customer: "Neha G.", rating: 4.9 },
    { id: 2843, distance: 7.5, duration: 22, fare: 220, daysAgo: 2, customer: "Vikram S.", rating: 4.7 }
  ]

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-lg">Recent Rides</h3>
        <button className="text-white/60 text-sm hover:text-white transition-colors">View All →</button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {rides.map((ride, index) => (
          <div key={ride.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-purple-400">🚗</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-white font-medium">Trip #{ride.id}</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-white/80 text-xs">{ride.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-white/60 text-sm">{ride.distance} km</span>
                <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                <span className="text-white/60 text-sm">{ride.duration} min</span>
                <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                <span className="text-white/60 text-sm">{ride.customer}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">{formatCurrency(ride.fare)}</p>
              <p className="text-white/40 text-xs">{ride.daysAgo === 0 ? 'Today' : `${ride.daysAgo}d ago`}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2">
            <p className="text-white/60 text-xs">Total Rides</p>
            <p className="text-white font-bold text-xl">2,847</p>
          </div>
          <div className="text-center p-2">
            <p className="text-white/60 text-xs">Total Distance</p>
            <p className="text-white font-bold text-xl">28,456 km</p>
          </div>
          <div className="text-center p-2">
            <p className="text-white/60 text-xs">Total Earnings</p>
            <p className="text-white font-bold text-xl">₹12.5L</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryTab