import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);

    // [2, 4, 8] splice(1 index, 2 how many you want to take out), will return [4, 8]
    // mutates original array - [2]
    // [2, 4, 8] slice (1 index to begin, 2 index to end, not included), will return 4
    // does not mutate original array - [2, 4, 8]
    this.items.splice(index, 1);
  }
  updateCount(id, newCount) {
    this.items.find(el => el.id === id).count = newCount;
  }
}
