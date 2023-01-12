export default class SortModel {
  constructor(json) {
    this.langKey = json?.lang_key;
    this.field = json?.field;
    this.value = json?.value;
  }
}
