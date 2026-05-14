import React, { useContext, useEffect } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({ children }) => {

    const navigate = useNavigate()

    const { loading, user } = useContext(userDataContext)

    useEffect(() => {

        const token =
            localStorage.getItem('token') ||
            sessionStorage.getItem('token')

        if (!token) {
            navigate('/login')
        }

    }, [])

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center text-2xl">
                Loading...
            </div>
        )
    }

    return children
}

export default UserProtectedWrapper