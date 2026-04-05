import { useEffect, useState } from "react";
import { SectionCard } from "../ui/SectionCard";
import { type Agency, listAgencies } from "../../api/agencies";
import { Eye, Pencil, Trash2 } from "lucide-react";

import './AgenciesSection.css'
import { ApiHttpError } from "../../api/http";

export function AgenciesSection() {
    const [agencies, setAgencies] = useState<Agency[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    function userFacingHttpMessage(e: ApiHttpError): string {
        switch (e.status) {
            case  401:
                return "you must be signed in to load agencies."
            case 403:
                return "you don't have access to this."
            default:
                return "something went wrong. Try again later."
        }
    }

    useEffect(() => {
        let cancelled = false
        listAgencies()
            .then((rows) => {
                if (cancelled) return
                setAgencies(rows)
                setError(null)
            })
            .catch((e) => {
                if (cancelled) return
                setError(e instanceof ApiHttpError ? userFacingHttpMessage(e) : 'failed')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const onView = (id: number) => {
        console.log(id)
    }

    const onEdit = (id: number) => {
        console.log(id)
    }

    const onDelete = (id: number) => {
        console.log(id)
    }

    return (
        <SectionCard title="Agencies">
            <div
                className="ft-text-body"
            >
                {loading && <p>Loading agencies...</p>}

                {error && (
                    <p role="alert" style={{ color: 'var(--color-primary)' }}>{error}</p>
                )}

                {!loading && !error && agencies.length === 0 && (
                    <p>No agencies yet.</p>
                )}

                {!loading && !error && agencies.length > 0 && (
                    <ul className="ft-agency-list">
                        {agencies.map((a) => (
                            <li key={a.id} className="ft-agency-row">
                                <button type="button" className="ft-agency-row__name" onClick={() => onView(a.id)}>{a.name}</button>

                                <div className="ft-agency-row__actions">
                                    <button type="button" className="ft-icon-btn" aria-label="View agency" onClick={() => onView(a.id)}>
                                        <Eye size={18} strokeWidth={2} />
                                    </button>
                                    <button type="button" className="ft-icon-btn" aria-label="Edit agency" onClick={() => onEdit(a.id)}>
                                        <Pencil size={18} strokeWidth={2} />
                                    </button>
                                    <button type="button" className="ft-icon-btn" aria-label="Delete agency" onClick={() => onDelete(a.id)}>
                                        <Trash2 size={18} strokeWidth={2} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </SectionCard>
    )
}