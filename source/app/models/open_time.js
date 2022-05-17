export default class OpenTimeModel {
  constructor(json) {
    this.label = json?.key;
    this.start = json?.schedule?.[0]?.start;
    this.end = json?.schedule?.[0]?.end;
  }
}
