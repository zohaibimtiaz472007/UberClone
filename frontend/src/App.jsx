import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogout from './components/UserLogout'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import Dashboard from './pages/Dashboard'
import CaptainDashboard from './pages/CaptainDashboard'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import UserDashboard from './pages/UserDashboard'
import Ride from './pages/Ride'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        }/>
        <Route path='/dashboard' element={
          <UserProtectedWrapper>
            <Dashboard />
          </UserProtectedWrapper>
        }/>
        <Route path='/captain-dashboard' element = {
          <CaptainProtectedWrapper>
            <CaptainDashboard />
          </CaptainProtectedWrapper>
        }/>
        <Route path='/user-dashboard' element = {
          <UserProtectedWrapper>
            <UserDashboard />
          </UserProtectedWrapper>
        }/>
        <Route path='/ride' element = {
          <UserProtectedWrapper>
            <Ride />
          </UserProtectedWrapper>
        }/>
      </Routes>

    </div>
  )
}

export default App