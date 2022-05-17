export default class LocationModel {
  constructor(json) {
    this.name = json?.name;
    this.longitude = json?.longitude;
    this.latitude = json?.latitude;
  }
}
