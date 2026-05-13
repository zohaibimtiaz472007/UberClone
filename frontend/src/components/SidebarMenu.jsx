import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const SidebarMenu = ({ isOpen, onClose, isOnline, setIsOnline, stats }) => {
  const { captain } = useContext(CaptainDataContext);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl animate-slideRight overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Captain Menu</h2>
              <p className="text-sm text-gray-500">Ride with confidence</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <MenuItem
              icon="📊"
              label="Earnings Report"
              subtitle="View detailed earnings"
            />
            <MenuItem
              icon="📅"
              label="Trip History"
              subtitle="View your past rides"
            />
            <MenuItem
              icon="⚙️"
              label="Settings"
              subtitle="Account & preferences"
            />
            <MenuItem
              icon="❓"
              label="Help & Support"
              subtitle="24/7 customer support"
            />
            <MenuItem
              icon="📜"
              label="Terms & Policies"
              subtitle="Legal information"
            />

            <hr className="my-4" />

            <button
              onClick={() => setIsOnline(!isOnline)}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all"
            >
              <span className="text-2xl">{isOnline ? "🟢" : "🔴"}</span>
              <div className="text-left">
                <p className="font-medium text-gray-900">
                  {isOnline ? "Go Offline" : "Go Online"}
                </p>
                <p className="text-xs text-gray-500">
                  Toggle ride availability
                </p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all">
              <span className="text-2xl">🚪</span>
              <div className="text-left">
                <p className="font-medium">Logout</p>
                <p className="text-xs text-red-500">Exit captain mode</p>
              </div>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">👨</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {captain?.fullname?.firstname} {captain?.fullname?.lastname}
              </p>
              <p className="text-xs text-gray-500">
                Captain ID: {captain?._id || "CAP123456"}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs text-gray-600">{stats.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ icon, label, subtitle }) => (
  <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all">
    <span className="text-2xl">{icon}</span>
    <div className="text-left">
      <p className="font-medium text-gray-900">{label}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  </button>
);

export default SidebarMenu;
