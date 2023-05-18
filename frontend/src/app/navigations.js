// AQUI IMPLEMENTA AS ROTAS DO DASHBOARD PARA OS OUTROS COMPONENTES DO SISTEMA

export const navigations = [
  { name: 'Início', path: '/dashboard/inicio', icon: 'home' },
  { name: 'Torneios', path: '/dashboard/torneios', icon: 'trophy' },
  { name: 'Pescadores', path: '/dashboard/pescadores', icon: 'rowing' },
  { name: 'Equipes', path: '/dashboard/equipes', icon: 'groups' },
  { name: 'Apurações', path: '/dashboard/apuracoes', icon: 'receipt_long' },
  {
    name: 'Relatórios', icon: 'equalizer', children: [
      { name: 'Relatório Individual', path: '/dashboard/relatorios/individual', iconText: 'A' },
      { name: 'Relatório Geral de Equipes', path: '/dashboard/relatorios/equipes', iconText: 'B' },
      { name: 'Relatório Categoria Especial', path: '/dashboard/relatorio/especial', iconText: 'C' },
    ],
  },
];
