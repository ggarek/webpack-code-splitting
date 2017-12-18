const screens = [
  {
    name: 'skills',
    bundle: () => import(/* webpackChunkName: "skills" */ './screens/skills')},
  {
    name: 'character',
    bundle: () => import(/* webpackChunkName: "character" */ './screens/character')
  },
  {
    name: 'inventory',
    bundle: () => import(/* webpackChunkName: "inventory" */ './screens/inventory')
  },
];

document.addEventListener('DOMContentLoaded', () => require('./app')(screens));
