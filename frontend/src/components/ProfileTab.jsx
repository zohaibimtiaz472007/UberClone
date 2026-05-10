import React from 'react'

const ProfileTab = ({ stats }) => {
  const driver = {
    name: "Rahul Sharma",
    captainId: "CAP123456",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    joinedDate: "January 2020",
    vehicle: {
      model: "Toyota Innova Crysta",
      registration: "KA 01 AB 1234",
      color: "White",
      year: "2022"
    },
    documents: {
      license: "Verified",
      registration: "Verified",
      insurance: "Verified",
      pollution: "Verified"
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center hover:scale-[1.01] transition-all">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl hover:scale-105 transition-transform">
          <span className="text-5xl">👨</span>
        </div>
        <h3 className="text-2xl font-bold text-white">{driver.name}</h3>
        <p className="text-white/60">Captain ID: {driver.captainId}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-yellow-400">★</span>
          <span className="text-white font-semibold">{stats.rating}</span>
          <span className="text-white/60">• {stats.totalRides}+ rides</span>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-1 text-white/60 text-sm">
            <span>📧</span>
            <span>{driver.email}</span>
          </div>
          <div className="flex items-center gap-1 text-white/60 text-sm">
            <span>📞</span>
            <span>{driver.phone}</span>
          </div>
        </div>
        <p className="text-white/40 text-xs mt-2">Member since {driver.joinedDate}</p>
      </div>

      {/* Vehicle Details */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <span>🚗</span> Vehicle Details
        </h3>
        <div className="space-y-3">
          <ProfileInfoRow label="Vehicle Model" value={driver.vehicle.model} />
          <ProfileInfoRow label="Registration Number" value={driver.vehicle.registration} />
          <ProfileInfoRow label="Vehicle Color" value={driver.vehicle.color} />
          <ProfileInfoRow label="Manufacturing Year" value={driver.vehicle.year} />
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <span>📄</span> Documents
        </h3>
        <div className="space-y-3">
          <DocumentRow document="Driver's License" status={driver.documents.license} />
          <DocumentRow document="Vehicle Registration" status={driver.documents.registration} />
          <DocumentRow document="Insurance" status={driver.documents.insurance} />
          <DocumentRow document="Pollution Certificate" status={driver.documents.pollution} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <QuickActionButton icon="🔧" label="Vehicle Maintenance" />
          <QuickActionButton icon="📊" label="Performance Report" />
          <QuickActionButton icon="🎓" label="Training Videos" />
          <QuickActionButton icon="💰" label="Wallet" />
        </div>
      </div>
    </div>
  )
}

const ProfileInfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
    <span className="text-white/70">{label}</span>
    <span className="text-white font-medium">{value}</span>
  </div>
)

const DocumentRow = ({ document, status }) => {
  const isVerified = status === 'Verified'
  
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📄</span>
        <span className="text-white">{document}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm ${isVerified ? 'text-green-400' : 'text-red-400'}`}>
          {status}
        </span>
        {isVerified && (
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
  )
}

const QuickActionButton = ({ icon, label }) => (
  <button className="flex items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
    <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-white text-sm">{label}</span>
  </button>
)

export default ProfileTab