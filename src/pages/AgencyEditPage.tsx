import { Link, useNavigate, useParams } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { AgencyUpdateInputSchema, type Agency } from '../api/schemas/agency';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { getAgency, updateAgency } from '../api/agencies';
import { ApiHttpError } from '../api/http';
import { Alert } from '../components/ui/Alert';
import './AgencyEditPage.css';
import { Button } from '../components/ui/Button';
import { parseAgencyId } from '../utils/parseAgencyId';
import { agencyUserFacingHttpMessage } from '../utils/userFacingHttpMessage';

const ACCESS_TOKEN = '';

export function AgencyEditPage() {
  const { agencyId } = useParams({ from: '/agencies/$agencyId/edit' });
  const [agency, setAgency] = useState<Agency | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

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
        setName(agency.name);
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

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setFieldError(null);
    setError(null);

    if (submitting) {
      return;
    }

    const id = parseAgencyId(agencyId);
    if (!id) {
      setError('Invalid agency ID');
      setLoading(false);
      return;
    }

    const result = AgencyUpdateInputSchema.safeParse({ name: name.trim() });
    if (!result.success) {
      setFieldError(result.error.issues[0]?.message ?? 'invalid name');
      return;
    }
    setSubmitting(true);
    try {
      const updated = await updateAgency(id, result.data, {
        accessToken: ACCESS_TOKEN,
      });
      await navigate({
        to: '/agencies/$agencyId',
        params: { agencyId: String(updated.id) },
      });
    } catch (e) {
      setError(
        e instanceof ApiHttpError
          ? agencyUserFacingHttpMessage('update', e)
          : 'failed'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ padding: 'var(--space-6)', maxWidth: '48rem' }}>
      {error && <Alert variant="error">{error}</Alert>}
      {loading ? (
        <LoadingSpinner loadingLabel="Loading agency..." />
      ) : (
        <>
          <p className="ft-text-body">
            <Link
              to="/agencies/$agencyId"
              params={{ agencyId: agencyId }}
              className="ft-agency-edit__back"
            >
              Back to {name}
            </Link>
          </p>
          <h1 style={{ marginTop: 0 }}>Edit {name}</h1>
          <form className="ft-agency-edit-form" onSubmit={handleSubmit}>
            <label className="ft-agency-edit-form__label" htmlFor="agency-name">
              Name
            </label>
            <input
              id="agency-name"
              className="ft-agency-edit-form__input"
              name="name"
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              maxLength={255}
              aria-invalid={fieldError ? true : false}
              aria-describedby={fieldError ? 'agency-name-error' : undefined}
              disabled={submitting}
            />
            {fieldError && (
              <Alert id="agency-name-error" role="alert" variant="error">
                {fieldError}
              </Alert>
            )}
            <div className="ft-agency-edit-form__actions">
              {submitting ? (
                <LoadingSpinner loadingLabel="Updating agency..." />
              ) : (
                <>
                  <Button type="submit" variant="primary" disabled={submitting}>
                    Update
                  </Button>
                  <Link
                    to="/agencies/$agencyId"
                    params={{ agencyId: agencyId }}
                    className="ft-button ft-button--secondary"
                  >
                    Cancel
                  </Link>
                </>
              )}
            </div>
          </form>
        </>
      )}
    </main>
  );
}
