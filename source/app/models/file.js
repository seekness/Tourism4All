export default class FileModel {
  constructor(data) {
    this.name = data.name;
    this.type = data.type;
    this.url = data.url;
    this.size = data.size;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json FileModel is not object';
      }
      const arr = json.name.split('.');
      return new FileModel({
        name: arr[0] ?? '',
        type: arr[1] ?? '',
        url: json.url,
        size: json.size,
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
