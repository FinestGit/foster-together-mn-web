import z from "zod";

export class AgencyParseError extends Error {
    readonly zodError: z.ZodError

    constructor(message: string, zodError: z.ZodError) {
        super(message)
        this.name = "AgencyParseError"
        this.zodError = zodError
    }
}

export function parseAgency(raw: unknown): Agency {
    const result = AgencySchema.safeParse(raw)
    if (!result.success) {
        console.error("Agency response shape invalid", result.error.flatten())
        throw new AgencyParseError("Unexpected agency data from the server.", result.error)
    }
    return result.data
}

export function parseAgencyList(raw: unknown): Agency[] {
    const result = AgencySchema.array().safeParse(raw)
    if (!result.success) {
        console.error("Agency list response shape invalid", result.error.flatten())
        throw new AgencyParseError("Unexpected agency list from server.", result.error)
    }
    return result.data
}

export const AgencySchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const AgencyCreateInputSchema = z.object({
    name: z.string().min(1).max(255),
})

export const AgencyUpdateInputSchema = AgencyCreateInputSchema

export type Agency = z.infer<typeof AgencySchema>
export type AgencyCreateInput = z.infer<typeof AgencyCreateInputSchema>
export type AgencyUpdateInput = z.infer<typeof AgencyUpdateInputSchema>