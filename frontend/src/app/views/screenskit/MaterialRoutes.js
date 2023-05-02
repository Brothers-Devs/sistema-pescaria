import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const AppTournaments = Loadable(lazy(() => import('./tournaments/AppTournaments')));
const AppAnglers = Loadable(lazy(() => import('./anglers/AppAnglers')));
const AppTeams = Loadable(lazy(() => import('./teams/AppTeams')));
const AppReports = Loadable(lazy(() => import('./reports/AppReports')));

const materialRoutes = [
  {
    path: '/dashboard/torneios',
    element: <AppTournaments />,
  },
  {
    path: '/dashboard/pescadores',
    element: <AppAnglers />,
  },
  {
    path: '/dashboard/equipes',
    element: <AppTeams />,
  },
  {
    path: '/dashboard/relatorios',
    element: <AppReports />,
  }
];






export default materialRoutes;
