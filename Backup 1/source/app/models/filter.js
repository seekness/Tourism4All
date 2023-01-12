import CategoryModel from './category';
import SortModel from './sort';

export default class FilterModel {
  constructor(json) {
    this.category = json?.category?.map?.(item => {
      return new CategoryModel(item);
    });
    this.feature = json?.feature?.map?.(item => {
      return new CategoryModel(item);
    });
    this.location = json?.location ? new CategoryModel(json?.location) : null;
    this.area = json?.area ? new CategoryModel(json?.area) : null;
    this.minPrice = json?.minPrice;
    this.maxPrice = json?.maxPrice;
    this.sort = json?.sort ? new SortModel(json?.sort) : null;
    this.color = json?.color;
    this.perPage = 10;
  }
}
