module.exports = function renderApp(screens) {
  let currentScreen;

  const root = document.createElement('main');
  root.setAttribute('style', 'width: 300px; margin: 0 auto;');

  const screenSlot = document.createElement('section');
  screenSlot.setAttribute('style', 'border: 1px solid rgba(0,0,0,0.35); padding: 5px; margin: 2px; ');

  const switches = document.createElement('section');
  switches.setAttribute('style', 'border: 1px solid rgba(0,0,0,0.35); padding: 5px; margin: 2px; ');

  screens.forEach(screen => {
    const btn = document.createElement('button');
    btn.setAttribute('style', 'padding: 5px; margin: 2px; ');
    btn.appendChild(document.createTextNode(screen.name));
    btn.addEventListener('click', () => {
      screen.bundle()
        .then(module => {
          const nextScreen = module();

          if (currentScreen) {
            screenSlot.replaceChild(nextScreen, currentScreen);
          } else {
            screenSlot.appendChild(nextScreen);
          }

          currentScreen = nextScreen;
        })
        .catch(console.error.bind(console, 'Error loading module'));
    });

    switches.appendChild(btn);
  });

  root.appendChild(switches);
  root.appendChild(screenSlot);
  document.body.appendChild(root);
}
