export default class RatingModel {
  constructor(json) {
    this.avg = json?.rating_avg;
    this.total = json?.rating_count;
    this.score = json?.score ?? 5;
    this.data = json?.rating_meta;
  }
}
