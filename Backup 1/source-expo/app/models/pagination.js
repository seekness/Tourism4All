export default class PaginationModel {
  constructor(json) {
    this.page = json?.page;
    this.limit = json?.per_page;
    this.maxPage = json?.max_page;
    this.allowLoadMore = this.allowMore(this.page, this.maxPage);
  }

  allowMore(page, maxPage) {
    if (page && maxPage) {
      return maxPage > page;
    }
    return false;
  }
}
