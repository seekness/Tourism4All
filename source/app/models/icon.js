export default class IconModel {
  constructor(data) {
    this.title = data.title;
    this.icon = data.icon;
    this.value = data.value;
  }

  isEqual(object) {
    if (typeof object !== 'object') {
      throw 'json IconModel is not object';
    }
    return object.value === this.value;
  }
}
