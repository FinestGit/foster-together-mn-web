import { Link, useNavigate, useParams } from '@tanstack/react-router';
import './AgencyDetailPage.css';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { getAgency } from '../api/agencies';
import type { Agency } from '../api/schemas/agency';
import { ApiHttpError } from '../api/http';
import { Button } from '../components/ui/Button';
import { parseAgencyId } from '../utils/parseAgencyId';
import { agencyUserFacingHttpMessage } from '../utils/userFacingHttpMessage';

const ACCESS_TOKEN = '';

export function AgencyDetailPage() {
  const { agencyId } = useParams({ from: '/agencies/$agencyId' });
  const [agency, setAgency] = useState<Agency | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setAgency(null);
    setError(null);
    let cancelled = false;
    const id = parseAgencyId(agencyId);
    if (!id) {
      setError('Invalid agency ID');
      setLoading(false);
      return;
    }

    getAgency(id, { accessToken: ACCESS_TOKEN })
      .then((agency) => {
        if (cancelled) return;
        setAgency(agency);
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
  }, [agencyId]);

  return (
    <main style={{ padding: 'var(--space-6)', maxWidth: '48rem' }}>
      <p className="ft-text-body">
        <Link to="/agencies" className="ft-agency-detail__back">
          Back to agencies
        </Link>
      </p>
      {loading && <LoadingSpinner loadingLabel="Loading agency..." />}

      {error && (
        <p role="alert" style={{ color: 'var(--color-primary)' }}>
          {error}
        </p>
      )}

      {!loading && !error && agency === null && (
        <p>Agency could not be loaded...</p>
      )}

      {!loading && !error && agency !== null && (
        <>
          <h1 style={{ marginTop: 0 }}>{agency.name}</h1>
          <p className="ft-text-body">Created At: {agency.createdAt}</p>
          <p className="ft-text-body">Last Updated At: {agency.updatedAt}</p>
          <div className="ft-agency-detail__actions">
            <Button
              variant="primary"
              onClick={() =>
                navigate({
                  to: '/agencies/$agencyId/edit',
                  params: { agencyId: agencyId },
                })
              }
            >
              Edit
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
