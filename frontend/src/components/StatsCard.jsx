import React from 'react'

const StatsCard = ({ icon, label, value, subtitle, color = 'purple' }) => {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600'
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 hover:scale-[1.02] transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[color]} rounded-full flex items-center justify-center`}>
          <span className="text-white text-xl">{icon}</span>
        </div>
        <span className="text-white/60 text-sm">{label}</span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-white/60 text-sm mt-1">{subtitle}</p>
    </div>
  )
}

export default StatsCard