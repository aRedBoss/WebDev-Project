import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (username, email, phoneNumber, password) => {
        setIsLoading(true)
        setError(null)
        console.log(username, email, phoneNumber, password)

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, phoneNumber, password })
            })
            const json = await response.json()
            console.log(json)

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
            if (response.ok) {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))

                // update the auth context
                dispatch({ type: 'LOGIN', payload: json })

                // update loading state
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return { signup, isLoading, error }
}