import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import './AppShell.css';
import { Button } from '../ui/Button';
import { UserRound } from 'lucide-react';

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const inAgencies = pathname.startsWith('/agencies');
  const onAgenciesDirectory =
    pathname === '/agencies' || pathname === '/agencies/';

  return (
    <div className="ft-app-shell">
      <header className="ft-app-shell__top">
        <div className="ft-top-nav">
          <Link to="/" className="ft-top-nav__brand">
            Foster Together MN
          </Link>
          {inAgencies && (
            <div className="ft-top-nav__context">
              <Link
                to="/agencies"
                className={
                  'ft-top-nav__directory' +
                  (onAgenciesDirectory ? ' is-active' : '')
                }
              >
                Directory
              </Link>
              <Button variant="primary">Add Agency</Button>
            </div>
          )}
          <div className="ft-top-nav__end">
            <button
              type="button"
              className="ft-top-nav__account"
              aria-label="Account"
            >
              <UserRound />
            </button>
          </div>
        </div>
      </header>
      <div className="ft-app-shell__body">
        <aside className="ft-app-shell__sidebar" aria-label="Main navigation">
          <nav className="ft-side-nav">
            <ul>
              <li>
                <Link
                  to="/"
                  className="ft-side-nav__link"
                  activeProps={{ className: 'ft-side-nav__link is-active' }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/agencies"
                  className="ft-side-nav__link"
                  activeProps={{ className: 'ft-side-nav__link is-active' }}
                >
                  Agencies
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="ft-app-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
