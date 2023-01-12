export default class SortModel {
  constructor(data) {
    this.title = data.title;
    this.value = data.value;
    this.field = data.field;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json SortModel is not object';
      }
      return new SortModel({
        title: json.lang_key ?? '',
        value: json.value ?? '',
        field: json.field ?? '',
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
