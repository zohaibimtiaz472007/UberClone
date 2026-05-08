import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const CaptainProtectedWrapper = ({ children }) => {

    const {loading, setLoading, setCaptain} = useContext(CaptainDataContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    if(!token) {
        navigate('/captain-login')
        return null
    }

     
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200) {
            setCatpain(response.data)
            setLoading(false)

        }
    }).catch((error) => {
        console.error('Error fetching captain profile:', error)
        localStorage.removeItem('token')
        setLoading(false)
        navigate('/captain-login')
    })

    if(loading) {
        return <div>Loading...</div>
    }

  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectedWrapper