import SortModel from './sort';
import CategoryModel from './category';

export default class SettingModel {
  constructor(json) {
    this.mode = json?.settings?.list_mode;
    this.color = json?.settings?.color_option;
    this.perPage = json?.settings?.per_page;
    this.priceMin = json?.settings?.price_min;
    this.priceMax = json?.settings?.price_max;
    this.timeMin = json?.settings?.time_min;
    this.timeMax = json?.settings?.time_max;
    this.unitPrice = json?.settings?.unit_price;
    this.categories = json?.categories?.map?.(item => {
      return new CategoryModel(item);
    });
    this.features = json?.features?.map?.(item => {
      return new CategoryModel(item);
    });
    this.locations = json?.locations?.map?.(item => {
      return new CategoryModel(item);
    });
    this.sortOption = json?.place_sort_option?.map?.(item => {
      return new SortModel(item);
    });
  }
}
