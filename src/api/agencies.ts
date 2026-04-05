import { requestJson } from "./http"
import { parseAgencyList, type Agency } from "./schemas/agency"

const AGENCIES_PATH = '/api/v1/agencies'

export async function listAgencies(): Promise<Agency[]> {
    const raw = await requestJson<unknown>(AGENCIES_PATH)
    return parseAgencyList(raw ?? [])
}