import { useDispatch } from "react-redux";
import { login, register, GetMe, upgradePremium, logout } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
    const dispatch = useDispatch()

    async function handleregister(username, email, password) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await register(username, email, password)
            return { success: true, data }
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Registration failed'))
            return { success: false, error: err }
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin(email, password) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await login(email, password)
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Login failed'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await GetMe()
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to fetch user'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleUpgradeToPremium() {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await upgradePremium()
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Upgrade to premium failed'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogout() {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            await logout()
            dispatch(setUser(null))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Logout failed'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        handleregister,
        handleLogin,
        handleGetMe,
        handleUpgradeToPremium,
        handleLogout,
    }
}

