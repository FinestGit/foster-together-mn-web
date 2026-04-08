import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import App from './App';
import { AgenciesPage } from './pages/AgenciesPage';
import { AppShell } from './components/layout/AppShell';
import { AgencyDetailPage } from './pages/AgencyDetailPage';
import { AgencyCreatePage } from './pages/AgencyCreatePage';
import { AgencyEditPage } from './pages/AgencyEditPage';

const rootRoute = createRootRoute({
  component: () => <AppShell />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const agenciesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/agencies',
  component: AgenciesPage,
});

const agencyCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/agencies/new',
  component: AgencyCreatePage,
});

const agencyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/agencies/$agencyId',
  component: AgencyDetailPage,
});

const agencyEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/agencies/$agencyId/edit',
  component: AgencyEditPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  agenciesRoute,
  agencyCreateRoute,
  agencyDetailRoute,
  agencyEditRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
