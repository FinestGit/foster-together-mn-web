import { Link, useParams } from '@tanstack/react-router';
import './AgencyDetailPage.css';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { getAgency } from '../api/agencies';
import type { Agency } from '../api/schemas/agency';
import { ApiHttpError } from '../api/http';

const ACCESS_TOKEN = '';

export function AgencyDetailPage() {
  const { agencyId } = useParams({ from: '/agencies/$agencyId' });
  const [agency, setAgency] = useState<Agency | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function userFacingHttpMessage(e: ApiHttpError) {
    switch (e.status) {
      case 401:
        return 'you must be signed in to load an agency.';
      case 403:
        return "you don't have access to this.";
      case 404:
        return 'agency not found.';
      default:
        return 'something went wrong. Try again later.';
    }
  }

  useEffect(() => {
    setLoading(true);
    setAgency(null);
    setError(null);
    let cancelled = false;
    let id = Number.parseInt(agencyId, 10);
    if (Number.isNaN(id) || id <= 0) {
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
          e instanceof ApiHttpError ? userFacingHttpMessage(e) : 'failed'
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
        </>
      )}
    </main>
  );
}
