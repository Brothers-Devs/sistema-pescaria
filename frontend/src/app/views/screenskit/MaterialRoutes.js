import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import AppFisherman from './fishermen/AppFisherman';

const AppTournaments = Loadable(lazy(() => import('./tournaments/AppTournaments')));
const AppTeams = Loadable(lazy(() => import('./teams/AppTeams')));
const CreateTeams = Loadable(lazy(() => import('./teams/CreateTeam')));
const EditTeam = Loadable(lazy(() => import('./teams/EditTeam')));
const AppVerification = Loadable(lazy(() => import('./verification/AppVerification')));
const CreateVerification = Loadable(lazy(() => import('./verification/formsTableCreate/CreateVerification')));
const EditVerification = Loadable(lazy(() => import('./verification/formsTableUpdate/EditVerification')));
const AppReportsIndividual = Loadable(lazy(() => import('./reports/AppReportsIndividual')));
const AppReportsTeams = Loadable(lazy(() => import('./reports/AppReportsTeams')));
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
    path: '/dashboard/apuracoes/editar/:id',
    element: <EditVerification />,
  },
  {
    path: '/dashboard/pescadores/cadastrar',
    element: <CreateFisherman />,
  },
  {
    path: '/dashboard/pescadores/editar/:id',
    element: <EditFisherman />,
  },
  {
    path: '/dashboard/relatorios/individual',
    element: <AppReportsIndividual />,
  },
  {
    path: '/dashboard/relatorios/equipes',
    element: <AppReportsTeams />,
  },
];

export default materialRoutes;
