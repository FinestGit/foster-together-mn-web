import { Loader2 } from 'lucide-react';
import './LoadingSpinner.css';

type LoadingSpinnerProps = {
  loadingLabel?: string;
};

export function LoadingSpinner({
  loadingLabel = 'Loading...',
}: LoadingSpinnerProps) {
  return (
    <div className="ft-loading-spinner-root" role="status" aria-live="polite">
      <Loader2 className="ft-loading-spinner" size={20} aria-hidden />
      <span className="ft-visually-hidden">{loadingLabel}</span>
    </div>
  );
}
