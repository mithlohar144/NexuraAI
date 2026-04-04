import axios from 'axios'

const API_BASE_URL = (import.meta.env.BACKEND_URL || "http://localhost:5000").replace(/\/$/, "")

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})

export const register = async (username, email, password) => {
    const response = await api.post('/api/auth/register', { username, email, password })
    return response.data
}

export const login = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password })
    return response.data
}

export const GetMe = async () => {
    const response = await api.get('/api/auth/get-me')
    return response.data
}

export const logout = async () => {
    const response = await api.get('/api/auth/logout')
    return response.data
}