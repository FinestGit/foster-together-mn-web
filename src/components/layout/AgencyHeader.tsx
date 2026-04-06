import { Button } from '../ui/Button';
import type { HTMLAttributes } from 'react';

import './AgencyHeader.css';
import { Link, useNavigate } from '@tanstack/react-router';

type Props = HTMLAttributes<HTMLDivElement> & {
  onAgenciesDirectory: boolean;
};

export function AgencyHeader({ onAgenciesDirectory, ...props }: Props) {
  const navigate = useNavigate();

  return (
    <div className="ft-top-nav__context" {...props}>
      <Link
        to="/agencies"
        className={
          'ft-top-nav__directory' + (onAgenciesDirectory ? ' is-active' : '')
        }
      >
        Directory
      </Link>
      <Button
        variant="primary"
        onClick={() => navigate({ to: '/agencies/new' })}
      >
        Add Agency
      </Button>
    </div>
  );
}
