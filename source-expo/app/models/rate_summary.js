export default class RateSummaryModel {
  constructor(json) {
    this.one = json.one;
    this.two = json.two;
    this.three = json.three;
    this.four = json.four;
    this.five = json.five;
    this.avg = json.avg;
    this.total = json.total;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json RateSummaryModel is not object';
      }
      return new RateSummaryModel({
        one: (json.rating_meta['1'] / json.rating_count) * 100 ?? 0.0,
        two: (json.rating_meta['2'] / json.rating_count) * 100 ?? 0.0,
        three: (json.rating_meta['3'] / json.rating_count) * 100 ?? 0.0,
        four: (json.rating_meta['4'] / json.rating_count) * 100 ?? 0.0,
        five: (json.rating_meta['5'] / json.rating_count) * 100 ?? 0.0,
        avg: parseFloat(json.rating_avg ?? '0'),
        total: json.rating_count ?? 0,
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
