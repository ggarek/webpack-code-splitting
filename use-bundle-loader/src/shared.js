module.exports = {
  renderScreen(screen) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(screen));
    return div;
  }
};
