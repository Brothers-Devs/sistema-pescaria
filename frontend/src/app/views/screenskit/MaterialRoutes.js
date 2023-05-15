import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import AppFisherman from './fishermen/AppFisherman';

const AppTournaments = Loadable(lazy(() => import('./tournaments/AppTournaments')));
const AppTeams = Loadable(lazy(() => import('./teams/AppTeams')));
const CreateTeams = Loadable(lazy(() => import('./teams/CreateTeam')));
const EditTeam = Loadable(lazy(() => import('./teams/EditTeam')));
const AppVerification = Loadable(lazy(() => import('./verification/AppVerification')));
const CreateVerification = Loadable(lazy(() => import('./verification/formsTableCreate/CreateVerification')));
const AppReports = Loadable(lazy(() => import('./reports/AppReports')));
const CreateFisherman = Loadable(lazy(() => import('./fishermen/CreateFisherman')));
const EditFisherman = Loadable(lazy(() => import('./fishermen/EditFisherman')));

const materialRoutes = [
  {
    path: '/dashboard/torneios',
    element: <AppTournaments />,
  },
  {
    path: '/dashboard/pescadores',
    element: <AppFisherman />,
  },
  {
    path: '/dashboard/equipes',
    element: <AppTeams />,
  },
  {
    path: '/dashboard/equipes/cadastrar',
    element: <CreateTeams />,
  },
  {
    path: '/dashboard/equipes/editar/:id',
    element: <EditTeam />,
  },
  {
    path: '/dashboard/apuracoes',
    element: <AppVerification />,
  },
  {
    path: '/dashboard/apuracoes/cadastrar',
    element: <CreateVerification />,
  },
  {
    path: '/dashboard/relatorios',
    element: <AppReports />,
  },
  {
    path: '/dashboard/pescadores/cadastrar',
    element: <CreateFisherman />,
  },
  {
    path: '/dashboard/pescadores/editar/:id',
    element: <EditFisherman />,
  }
];

export default materialRoutes;
