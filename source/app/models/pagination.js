export default class PaginationModel {
  constructor(data) {
    this.page = data.page;
    this.maxPage = data.maxPage;
    this.perPage = data.perPage;
    this.total = data.total;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json PaginationModel is not object';
      }
      return new PaginationModel({
        page: json.page ?? 1,
        maxPage: json.max_page ?? 1,
        perPage: json.per_page ?? 1,
        total: json.total ?? 1,
      });
    } catch (e) {
      console.log(e.toString());
    }
  }

  get allowMore() {
    if (this.page < this.maxPage) {
      return true;
    }
    return false;
  }
}
