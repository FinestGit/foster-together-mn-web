import { AgenciesSection } from '../components/agencies/AgenciesSection';

export function AgenciesPage() {
  return (
    <main style={{ padding: 'var(--space-6)', maxWidth: '48rem' }}>
      <h1 style={{ marginTop: 0 }}>Agencies</h1>
      <AgenciesSection />
    </main>
  );
}
