import SkillsBundle from './screens/skills';
import CharacterBundle from './screens/character';
import InventoryBundle from './screens/inventory';

[
  SkillsBundle,
  CharacterBundle,
  InventoryBundle,
].map(bundle => {
  document.body.appendChild(bundle());
});