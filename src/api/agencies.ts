import { requestJson } from "./http"

export type Agency = {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

const AGENCIES_PATH = '/api/v1/agencies'

export async function listAgencies() {
    const data = await requestJson<Agency[]>(AGENCIES_PATH)
    return data ?? []
}