const rawBase = import.meta.env.VITE_API_BASE_URL

export function getApiBaseUrl(): string {
    return typeof rawBase === "string" ? rawBase.replace(/\/$/, "") : ""
}

export class ApiHttpError extends Error {
    readonly status: number
    readonly body: unknown

    constructor(status: number, message: string, body: unknown = undefined) {
        super(message)
        this.name = "ApiHttpError"
        this.status = status
        this.body = body
    }
}

const DEFAULT_TIMEOUT_MS = 30_000

export type RequestJsonOptions = {
    method?: string
    body?: unknown
    signal?: AbortSignal
    timeoutMs?: number
    headers?: Record<string, string>
}

function messageFromErrorBody(body: unknown, fallback: string): string {
    if (body !== null && typeof body === "object" && "detail" in body) {
        const d = (body as { detail?: unknown }).detail
        if (typeof d === "string" && d.length > 0) return d
    }
    return fallback
}

export async function requestJson<T>(
    path: string,
    options: RequestJsonOptions = {}
): Promise<T | undefined> {
    const { method = "GET", body, signal: userSignal, timeoutMs = DEFAULT_TIMEOUT_MS } = options

    const base = getApiBaseUrl()
    const normalizedPath = path.startsWith("/") ? path : `/${path}`
    const url = `${base}${normalizedPath}`

    const timeoutSignal = AbortSignal.timeout(timeoutMs)
    const signal = userSignal ? AbortSignal.any([userSignal, timeoutSignal]) : timeoutSignal

    const headers: Record<string, string> = {
        Accept: "application/json",
        ...options.headers,
    }
    let bodyInit: BodyInit | undefined
    if (body !== undefined) {
        headers["Content-Type"] = "application/json"
        bodyInit = JSON.stringify(body)
    }

    const response = await fetch(url, { method, headers, body: bodyInit, signal })

    if (!response.ok) {
        const ct = response.headers.get("content-type") ?? ""
        let errBody: unknown
        try {
            errBody = ct.includes("application/json")
                ? await response.json()
                : await response.text()
        } catch {
            errBody = undefined
        }
        const msg = messageFromErrorBody(errBody, response.statusText || `HTTP ${response.status}`)
        throw new ApiHttpError(response.status, msg, errBody)
    }

    if (response.status === 204) {
        return undefined
    }

    const text = await response.text()
    if (text.trim() === "") {
        return undefined
    }
    return JSON.parse(text) as T
}