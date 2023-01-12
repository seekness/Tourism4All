export default class ImageModel {
  constructor(json) {
    this.full = json?.full?.url ?? 'unknown';
    this.thump = json?.thumb?.url ?? 'unknown';
  }
}
