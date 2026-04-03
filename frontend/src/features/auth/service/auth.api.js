import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const api = axios.create({
    baseURL: process.env.BACKEND_URL ,
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

export const upgradePremium = async () => {
    const response = await api.post('/api/auth/upgrade-premium')
    return response.data
}

export const logout = async () => {
    const response = await api.get('/api/auth/logout')
    return response.data
}