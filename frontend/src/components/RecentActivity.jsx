import React from 'react'

const RecentActivity = ({ isOnline, completedRides }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">
      <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {completedRides > 0 && (
          <ActivityItem 
            icon="✅"
            iconColor="green"
            title="Ride completed"
            description="Successfully completed a ride"
            time="Just now"
          />
        )}
        <ActivityItem 
          icon="📍"
          iconColor="blue"
          title={isOnline ? "You are online" : "You are offline"}
          description={isOnline ? "Ready to accept rides" : "Go online to start earning"}
          time={isOnline ? "Active" : "Inactive"}
        />
        <ActivityItem 
          icon="⭐"
          iconColor="yellow"
          title="Great rating maintained"
          description="4.92 stars from 2847 rides"
          time="Today"
        />
      </div>
    </div>
  )
}

const ActivityItem = ({ icon, iconColor, title, description, time }) => {
  const colorClasses = {
    green: 'bg-green-500/20 text-green-400',
    blue: 'bg-blue-500/20 text-blue-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    purple: 'bg-purple-500/20 text-purple-400'
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
      <div className={`w-10 h-10 ${colorClasses[iconColor]} rounded-full flex items-center justify-center`}>
        <span>{icon}</span>
      </div>
      <div className="flex-1">
        <p className="text-white font-medium">{title}</p>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
      <span className="text-white/40 text-xs">{time}</span>
    </div>
  )
}

export default RecentActivity