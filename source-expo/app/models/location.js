export default class LocationModel {
  constructor(data) {
    this.name = data.name;
    this.longitude = data.longitude;
    this.latitude = data.latitude;
  }
  get view() {
    return `${this.latitude},${this.longitude}`;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json LocationModel is not object';
      }
      return new LocationModel({
        name: json.name ?? '',
        longitude: parseFloat(json.longitude ?? '0'),
        latitude: parseFloat(json.latitude ?? '0'),
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
