export default class ImageModel {
  constructor(data) {
    this.id = data.id;
    this.full = data.full;
    this.medium = data.medium;
    this.thumb = data.thumb;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json ImageModel is not object';
      }
      return new ImageModel({
        id: json.id ?? 0,
        full: json.full?.url ?? '',
        medium: json.medium?.url ?? '',
        thumb: json.thumb?.url ?? '',
      });
    } catch (e) {
      console.log(e.toString());
    }
  }

  static fromJsonUpload(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json ImageModel is not object';
      }
      return new ImageModel({
        id: json.id ?? 0,
        thumb: json.media_details?.sizes?.thumbnail?.source_url ?? '',
        medium: json.media_details?.sizes?.medium?.source_url ?? '',
        full: json.media_details?.sizes?.full?.source_url ?? '',
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
