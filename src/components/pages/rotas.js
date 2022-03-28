export default [
  {
    path: '/',
    name: 'home',
    component: () =>
      import('@/components/pages/personagens/ListaPersonagens.vue'),
  },
  {
    path: '/:id',
    name: 'detalhes',
    props: true,
    component: () =>
      import('@/components/pages/personagens/DetalhesPersonagem.vue'),
  },
];
