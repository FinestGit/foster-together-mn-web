import { Link, Outlet } from "@tanstack/react-router";
import "./AppShell.css";

export function AppShell() {
    return (
        <div className="ft-app-shell">
            <aside className="ft-app-shell__sidebar" aria-label="Main navigation">
                <nav className="ft-side-nav">
                    <ul>
                        <li>
                            <Link to="/" className="ft-side-nav__link" activeProps={{ className: 'ft-side-nav__link is-active' }}>Home</Link>
                        </li>
                        <li>
                            <Link to="/agencies" className="ft-side-nav__link" activeProps={{ className: 'ft-side-nav is-active' }}>Agencies</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div className="ft-app-shell__column">
                <header className="ft-app-shell__top"></header>
                <main className="ft-app-shell__content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}