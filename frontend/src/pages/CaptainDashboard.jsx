import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import TabNavigation from '../components/TabNavigation'
import RideRequestModal from '../components/RideRequestModal'
import ActiveRideCard from '../components/ActiveRideCard'
import StatsCard from '../components/StatsCard'
import EarningsCard from '../components/EarningCard'
import RecentActivity from '../components/RecentActivity'
import EarningsTab from '../components/EarningsTab'
import HistoryTab from '../components/HistoryTab'
import ProfileTab from '../components/ProfileTab'
import SidebarMenu from '../components/SidebarMenu'

const CaptainDashboard = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [currentRide, setCurrentRide] = useState(null)
  const [incomingRequest, setIncomingRequest] = useState(null)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [earnings, setEarnings] = useState({
    today: 12450,
    weekly: 87650,
    monthly: 342800,
    total: 1250000
  })
  const [stats, setStats] = useState({
    completedRides: 8,
    totalRides: 2847,
    rating: 4.92,
    acceptanceRate: 94
  })

  // Simulate incoming ride requests
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOnline && !incomingRequest && !currentRide && Math.random() > 0.7) {
        const newRequest = {
          id: Math.floor(Math.random() * 10000),
          pickupLocation: "MG Road, Bangalore",
          destinationLocation: "Electronic City, Bangalore",
          distance: "8.5 km",
          duration: "25 min",
          fare: Math.floor(Math.random() * 200) + 150,
          customerName: "Rajesh Kumar",
          customerRating: 4.8,
          pickupLat: 12.9716,
          pickupLng: 77.5946,
          destLat: 12.8453,
          destLng: 77.6602
        }
        setIncomingRequest(newRequest)
        setShowRequestModal(true)
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [isOnline, incomingRequest, currentRide])

  const handleAcceptRide = () => {
    setCurrentRide({
      ...incomingRequest,
      status: 'accepted',
      startTime: new Date()
    })
    setShowRequestModal(false)
    setIncomingRequest(null)
  }

  const handleDeclineRide = () => {
    setShowRequestModal(false)
    setIncomingRequest(null)
  }

  const handleStartRide = () => {
    setCurrentRide(prev => ({
      ...prev,
      status: 'ongoing',
      rideStartTime: new Date()
    }))
  }

  const handleCompleteRide = () => {
    setEarnings(prev => ({
      ...prev,
      today: prev.today + currentRide.fare
    }))
    setStats(prev => ({
      ...prev,
      completedRides: prev.completedRides + 1,
      totalRides: prev.totalRides + 1
    }))
    setCurrentRide(null)
    alert(`Ride completed! Earned ₹${currentRide.fare}`)
  }

  const handleCancelRide = () => {
    if (window.confirm('Are you sure you want to cancel this ride?')) {
      setCurrentRide(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      
      {/* Ride Request Modal */}
      {showRequestModal && incomingRequest && (
        <RideRequestModal 
          request={incomingRequest}
          onAccept={handleAcceptRide}
          onDecline={handleDeclineRide}
          onClose={() => setShowRequestModal(false)}
        />
      )}

      {/* Sidebar Menu */}
      <SidebarMenu 
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        isOnline={isOnline}
        setIsOnline={setIsOnline}
        stats={stats}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        
        <Header 
          onMenuClick={() => setShowMenu(true)}
          isOnline={isOnline}
        />

        {/* Online Status Banner */}
        {!isOnline && (
          <div className="bg-yellow-500/20 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-yellow-500/30">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⛔</span>
              <div className="flex-1">
                <p className="text-yellow-100 font-semibold">You are offline</p>
                <p className="text-yellow-100/80 text-sm">Go online to start receiving ride requests</p>
              </div>
              <button 
                onClick={() => setIsOnline(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-all"
              >
                Go Online
              </button>
            </div>
          </div>
        )}

        {/* Active Ride Card */}
        {currentRide && (
          <ActiveRideCard 
            ride={currentRide}
            onStartRide={handleStartRide}
            onCompleteRide={handleCompleteRide}
            onCancelRide={handleCancelRide}
          />
        )}

        {/* Tab Navigation */}
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Home Tab */}
        {activeTab === 'home' && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatsCard 
                icon="⭐"
                label="Rating"
                value={stats.rating}
                subtitle={`from ${stats.totalRides}+ rides`}
                color="purple"
              />
              <StatsCard 
                icon="✅"
                label="Acceptance"
                value={`${stats.acceptanceRate}%`}
                subtitle="last 30 days"
                color="blue"
              />
            </div>

            <EarningsCard earnings={earnings} ridesCount={stats.completedRides} />
            <RecentActivity isOnline={isOnline} completedRides={stats.completedRides} />
          </>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <EarningsTab earnings={earnings} />
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <HistoryTab />
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <ProfileTab stats={stats} />
        )}
      </div>
    </div>
  )
}

export default CaptainDashboard