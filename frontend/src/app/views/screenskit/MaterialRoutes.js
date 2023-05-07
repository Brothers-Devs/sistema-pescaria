import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import AppAnglers from './anglers/AppAnglers';

const AppTournaments = Loadable(lazy(() => import('./tournaments/AppTournaments')));
const AppTeams = Loadable(lazy(() => import('./teams/AppTeams')));
const AppReports = Loadable(lazy(() => import('./reports/AppReports')));
const FishermanRegistry = Loadable(lazy(() => import('../screenskit/anglers/ScreenFishermanRegistry')));

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
  },
  {
    path: '/dashboard/pescadores/cadastrar',
    element: <FishermanRegistry />,
  }
];






export default materialRoutes;
