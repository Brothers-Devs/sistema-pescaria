import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const Analytics = Loadable(lazy(() => import('./Analytics')));

const dashboardRoutes = [
  { path: '/dashboard/Inicio', element: <Analytics />},
];

export default dashboardRoutes;
