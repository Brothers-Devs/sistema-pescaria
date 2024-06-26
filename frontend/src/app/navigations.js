// AQUI IMPLEMENTA AS ROTAS DO DASHBOARD PARA OS OUTROS COMPONENTES DO SISTEMA

export const navigations = [
  { name: 'Início', path: '/dashboard/inicio', icon: 'home' },
  { name: 'Torneios', path: '/dashboard/torneios', icon: 'trophy' },
  { name: 'Pescadores', path: '/dashboard/pescadores', icon: 'rowing' },
  { name: 'Equipes', path: '/dashboard/equipes', icon: 'groups' },
  { name: 'Apurações', path: '/dashboard/apuracoes', icon: 'receipt_long' },
  {
    name: 'Classificação', icon: 'equalizer', children: [
      { name: 'Classificação final de equipes', path: '/dashboard/relatorios/final/equipes', iconText: 'A' },
      { name: 'Classificação final individual maior peixe', path: '/dashboard/relatorios/final/individual', iconText: 'B' },
    ],
  },
];
