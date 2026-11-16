import items from './items.json';

export const allItems = [...items.prints, ...items.presets];

const byName = new Map(allItems.map((item) => [item.name, item]));

export const findItem = (name) => byName.get(name);

export const itemPath = (name) => `/item/${encodeURIComponent(name)}`;

export default items;
