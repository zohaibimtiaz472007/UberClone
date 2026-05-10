import React from 'react'

const EarningsTab = ({ earnings }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-6 shadow-xl hover:scale-[1.01] transition-all">
        <p className="text-green-100 text-sm mb-2">Total Earnings</p>
        <p className="text-5xl font-bold text-white">{formatCurrency(earnings.total)}</p>
        <p className="text-green-100 text-sm mt-2">Lifetime earnings</p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Earnings Breakdown</h3>
        <div className="space-y-4">
          <EarningRow label="Today" rides="8 rides completed" amount={earnings.today} />
          <EarningRow label="This Week" rides="42 rides completed" amount={earnings.weekly} />
          <EarningRow label="This Month" rides="168 rides completed" amount={earnings.monthly} />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Bonus & Incentives</h3>
        <div className="space-y-3">
          <BonusCard 
            icon="🎯" 
            title="Completion Bonus" 
            subtitle="Complete 50 rides this month"
            bonus="+₹2,500"
          />
          <BonusCard 
            icon="⭐" 
            title="Rating Bonus" 
            subtitle="Maintain 4.9+ rating"
            bonus="+₹1,000"
          />
          <BonusCard 
            icon="🚀" 
            title="Peak Time Bonus" 
            subtitle="Complete 10 peak hour rides"
            bonus="+₹500"
          />
        </div>
      </div>
    </div>
  )
}

const EarningRow = ({ label, rides, amount }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-white/60 text-sm">{rides}</p>
      </div>
      <p className="text-white font-bold text-xl">{formatCurrency(amount)}</p>
    </div>
  )
}

const BonusCard = ({ icon, title, subtitle, bonus }) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
    <div className="flex items-center gap-2">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-white font-medium">{title}</p>
        <p className="text-white/60 text-xs">{subtitle}</p>
      </div>
    </div>
    <p className="text-green-400 font-bold">{bonus}</p>
  </div>
)

export default EarningsTab