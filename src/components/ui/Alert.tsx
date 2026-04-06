import type { HTMLAttributes, ReactNode } from 'react';
import './Alert.css';

export type AlertVariant = 'error' | 'warning' | 'info' | 'success';

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'role'> & {
  variant?: AlertVariant;
  role?: 'alert' | 'status';
  children: ReactNode;
};

export function Alert({
  variant = 'info',
  role: roleProp,
  className = '',
  children,
  ...props
}: Props) {
  const role =
    roleProp ??
    (variant === 'error' || variant === 'warning' ? 'alert' : 'status');

  return (
    <div
      className={`ft-alert ft-alert--${variant} ${className}`.trim()}
      role={role}
      {...(role === 'status' ? { 'aria-live': 'polite' as const } : {})}
      {...props}
    >
      {children}
    </div>
  );
}
