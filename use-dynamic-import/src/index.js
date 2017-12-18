[
  import(/* webpackChunkName: "skills" */ './screens/skills'),
  import(/* webpackChunkName: "inventory" */ './screens/inventory'),
  import(/* webpackChunkName: "character" */ './screens/character'),
].map(modulePromise => {
  modulePromise
    .then(module => document.body.appendChild(module()))
    .catch(err => console.error('Err module loading:', err));
});