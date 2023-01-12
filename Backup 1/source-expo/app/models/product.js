import ImageModel from './image';
import CategoryModel from './category';
import LocationModel from './location';
import UserModel from './user';
import OpenTimeModel from './open_time';

export default class ProductModel {
  constructor(json) {
    this.id = json?.ID?.toString();
    this.title = json?.post_title;
    this.author = json?.author ? new UserModel(json?.author) : null;
    this.image = json?.image ? new ImageModel(json?.image) : null;
    this.category = json?.category ? new CategoryModel(json?.category) : null;
    this.createDate = json?.post_date;
    this.dateEstablish = json?.date_establish;
    this.rate = json?.rating_avg;
    this.numRate = json?.rating_count;
    this.rateText = json?.post_status;
    this.status = json?.status;
    this.favorite = json?.wishlist;
    this.address = json?.address;
    this.phone = json?.phone;
    this.fax = json?.fax;
    this.email = json?.email;
    this.website = json?.website;
    this.description = json?.post_excerpt;
    this.priceMin = json?.price_min;
    this.priceMax = json?.price_max;
    this.link = json?.guid;
    this.openTime = json?.opening_hour?.map?.(item => {
      return new OpenTimeModel(item);
    });
    this.gallery = json?.galleries?.map?.(item => {
      return new ImageModel(item);
    });
    this.features = json?.features?.map?.(item => {
      return new CategoryModel(item);
    });
    this.related = json?.related?.map?.(item => {
      return new ProductModel(item);
    });
    this.lastest = json?.lastest?.map?.(item => {
      return new ProductModel(item);
    });
    this.location = new LocationModel({
      name: json?.post_title,
      latitude: json?.latitude,
      longitude: json?.longitude,
    });
  }
}
