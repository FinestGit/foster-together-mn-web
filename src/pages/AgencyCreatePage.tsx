import { Link, useNavigate } from '@tanstack/react-router';
import './AgencyCreatePage.css';
import type React from 'react';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { AgencyCreateInputSchema } from '../api/schemas/agency';
import { Alert } from '../components/ui/Alert';
import { createAgency } from '../api/agencies';
import { ApiHttpError } from '../api/http';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const ACCESS_TOKEN = '';

export function AgencyCreatePage() {
  const [name, setName] = useState<string>('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  function userFacingHttpMessage(e: ApiHttpError) {
    switch (e.status) {
      case 400:
        return e.message;
      case 401:
        return 'you must be signed in to create an agency.';
      case 403:
        return "you don't have access to this.";
      case 404:
        return 'could not create agency.';
      default:
        return 'something went wrong. Try again later.';
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldError(null);
    setError(null);

    if (submitting) {
      return;
    }
    const result = AgencyCreateInputSchema.safeParse({ name: name.trim() });
    if (!result.success) {
      setFieldError(result.error.issues[0]?.message ?? 'Invalid name');
      return;
    }
    setSubmitting(true);
    try {
      const created = await createAgency(result.data, {
        accessToken: ACCESS_TOKEN,
      });
      await navigate({
        to: '/agencies/$agencyId',
        params: { agencyId: String(created.id) },
      });
    } catch (e) {
      setError(e instanceof ApiHttpError ? userFacingHttpMessage(e) : 'failed');
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main style={{ padding: 'var(--space-6)', maxWidth: '48rem' }}>
      {error && <Alert variant="error">{error}</Alert>}
      <p className="ft-text-body">
        <Link to="/agencies" className="ft-agency-create__back">
          Back to agencies
        </Link>
      </p>
      <h1 style={{ marginTop: 0 }}>Add Agency</h1>

      <form className="ft-agency-create-form" onSubmit={handleSubmit}>
        <label className="ft-agency-create-form__label" htmlFor="agency-name">
          Name
        </label>
        <input
          id="agency-name"
          className="ft-agency-create-form__input"
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
        <div className="ft-agency-create-form__actions">
          {submitting ? (
            <LoadingSpinner loadingLabel="Creating agency..." />
          ) : (
            <>
              <Button type="submit" variant="primary" disabled={submitting}>
                Create
              </Button>
              <Link to="/agencies" className="ft-button ft-button--secondary">
                Cancel
              </Link>
            </>
          )}
        </div>
      </form>
    </main>
  );
}
