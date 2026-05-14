import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const userDataContext = createContext()

const UserContext = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchUser = async () => {

            try {

                const token =
                    localStorage.getItem('token') ||
                    sessionStorage.getItem('token')

                if (!token) {
                    setLoading(false)
                    return
                }

                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                console.log("PROFILE RESPONSE:", response.data)

                // CHECK YOUR RESPONSE STRUCTURE HERE
                setUser(response.data.user || response.data.data || response.data)

            } catch (error) {

                console.log(error)
                setUser(null)

            } finally {

                setLoading(false)

            }
        }

        fetchUser()

    }, [])

    return (
        <userDataContext.Provider
            value={{
                user,
                setUser,
                loading
            }}
        >
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext