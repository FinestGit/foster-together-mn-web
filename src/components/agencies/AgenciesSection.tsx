import { useEffect, useState } from 'react';
import { SectionCard } from '../ui/SectionCard';
import { deleteAgency, listAgencies } from '../../api/agencies';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { ApiHttpError } from '../../api/http';
import type { Agency } from '../../api/schemas/agency';

import './AgenciesSection.css';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Link } from '@tanstack/react-router';
import { agencyUserFacingHttpMessage } from '../../utils/userFacingHttpMessage';
import { Alert } from '../ui/Alert';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

const ACCESS_TOKEN = '';

export function AgenciesSection() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteTarget, setDeleteTarget] = useState<Agency | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listAgencies({ accessToken: ACCESS_TOKEN })
      .then((rows) => {
        if (cancelled) return;
        setAgencies(rows);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(
          e instanceof ApiHttpError
            ? agencyUserFacingHttpMessage('load', e)
            : 'failed'
        );
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function onDelete(id: number) {
    setDeleting(true);
    await deleteAgency(id, { accessToken: ACCESS_TOKEN })
      .then(() => {
        setAgencies((prev) => prev.filter((x) => x.id !== id));
        setDeleteTarget(null);
        setDeleteError(null);
      })
      .catch((e) => {
        setDeleteError(
          e instanceof ApiHttpError
            ? agencyUserFacingHttpMessage('delete', e)
            : 'failed'
        );
      })
      .finally(() => {
        setDeleting(false);
      });
  }

  return (
    <SectionCard title="Agencies">
      <div className="ft-text-body">
        {loading && <LoadingSpinner loadingLabel="Loading agencies..." />}

        {error && <Alert variant="error">{error}</Alert>}

        {!loading && !error && agencies.length === 0 && <p>No agencies yet.</p>}

        {!loading && !error && agencies.length > 0 && (
          <ul className="ft-agency-list">
            {agencies.map((a) => (
              <li key={a.id} className="ft-agency-row">
                <Link
                  to="/agencies/$agencyId"
                  params={{ agencyId: String(a.id) }}
                  className="ft-agency-row__name"
                >
                  {a.name}
                </Link>

                <div className="ft-agency-row__actions">
                  <Link
                    to="/agencies/$agencyId"
                    params={{ agencyId: String(a.id) }}
                    className="ft-icon-btn"
                    aria-label="View agency"
                  >
                    <Eye size={18} strokeWidth={2} />
                  </Link>
                  <Link
                    to="/agencies/$agencyId/edit"
                    params={{ agencyId: String(a.id) }}
                    className="ft-icon-btn"
                    aria-label="Edit agency"
                  >
                    <Pencil size={18} strokeWidth={2} />
                  </Link>
                  <button
                    type="button"
                    className="ft-icon-btn"
                    aria-label="Delete agency"
                    onClick={() => {
                      setDeleteError(null);
                      setDeleteTarget(a);
                    }}
                  >
                    <Trash2 size={18} strokeWidth={2} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Modal
          open={deleteTarget != null}
          onClose={() => {
            if (!deleting) {
              setDeleteTarget(null);
              setDeleteError(null);
            }
          }}
          title="Delete agency?"
          description={`Do you want to delete ${deleteTarget?.name}?`}
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  setDeleteTarget(null);
                  setDeleteError(null);
                }}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  const id = deleteTarget?.id;
                  if (id === undefined) return;
                  void onDelete(id);
                }}
                disabled={deleting}
              >
                Delete
              </Button>
            </>
          }
          children={
            <>{deleteError && <Alert variant="error">{deleteError}</Alert>}</>
          }
        />
      </div>
    </SectionCard>
  );
}
