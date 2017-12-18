import SkillsBundle from './screens/skills';
import CharacterBundle from './screens/character';
import InventoryBundle from './screens/inventory';

const asPromise = bundle => new Promise((rs, rj) => bundle(m => rs(m)));

const screens = [
  { name: 'skills', bundle: () => asPromise(SkillsBundle) },
  { name: 'character', bundle: () => asPromise(CharacterBundle) },
  { name: 'inventory', bundle: () => asPromise(InventoryBundle) },
];

document.addEventListener('DOMContentLoaded', () => require('./app')(screens));