import axios from "axios"

const rawBase = import.meta.env.VITE_API_BASE_URL

export const apiBaseUrl = typeof rawBase === 'string' ? rawBase.replace(/\/$/, '') : ''

export const apiClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        Accept: 'application/json'
    }
})