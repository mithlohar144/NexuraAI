import { useDispatch } from "react-redux";
import { login, register, GetMe } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
    const dispatch = useDispatch()

    async function handleregister(email, username, password) {

        try {
            dispatch(setLoading(true))
            const data = await register(email, username, password)

        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Registration failed'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin(email, password) {
        try {
            dispatch(setLoading(true))
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
            const data = await GetMe()
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to fetch user'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        handleregister,
        handleLogin,
        handleGetMe
    }
}

