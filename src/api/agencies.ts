import { apiClient } from "./client"

export type Agency = {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

const AGENCIES_PATH = '/api/v1/agencies'

export async function listAgencies() {
    const response = await apiClient.get<Agency[]>(AGENCIES_PATH)
    return response.data
}