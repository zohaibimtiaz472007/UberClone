import React from 'react'

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = ['home', 'earnings', 'history', 'profile']
  
  return (
    <div className="flex gap-2 mb-6 bg-white/10 backdrop-blur-lg rounded-2xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 py-2.5 rounded-xl font-semibold transition-all capitalize ${
            activeTab === tab 
              ? 'bg-white text-gray-900 shadow-lg' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default TabNavigation