import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import App from './App';
import { AgenciesPage } from './pages/AgenciesPage';
import { AppShell } from './components/layout/AppShell';

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

const routeTree = rootRoute.addChildren([indexRoute, agenciesRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
