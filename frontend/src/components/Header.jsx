import React from 'react'

const Header = ({ onMenuClick, isOnline }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <button 
        onClick={onMenuClick}
        className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Captain Dashboard</h1>
        <p className="text-sm text-white/60">Drive. Earn. Thrive.</p>
      </div>
      
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}>
        <div className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? 'bg-white' : 'bg-gray-300'}`}></div>
      </div>
    </div>
  )
}

export default Header