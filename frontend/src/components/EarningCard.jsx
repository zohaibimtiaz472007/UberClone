import React from 'react'

const EarningsCard = ({ earnings, ridesCount }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 mb-6 shadow-xl hover:scale-[1.01] transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white/60 text-sm">Today's Earnings</p>
          <p className="text-4xl font-bold text-white">{formatCurrency(earnings.today)}</p>
        </div>
        <div className="bg-green-500/20 backdrop-blur px-4 py-2 rounded-full">
          <span className="text-green-400 text-sm font-semibold">+{ridesCount} rides</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div className="group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
          <p className="text-white/60 text-xs">Weekly</p>
          <p className="text-white font-semibold group-hover:scale-105 transition-transform">{formatCurrency(earnings.weekly)}</p>
        </div>
        <div className="group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
          <p className="text-white/60 text-xs">Monthly</p>
          <p className="text-white font-semibold group-hover:scale-105 transition-transform">{formatCurrency(earnings.monthly)}</p>
        </div>
      </div>
    </div>
  )
}

export default EarningsCard