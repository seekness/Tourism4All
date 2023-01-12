import {
  CategoryModel,
  FileModel,
  ImageModel,
  LocationModel,
  OpenTimeModel,
  SettingModel,
  UserModel,
} from '@models';

export default class ProductModel {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.image = data.image;
    this.videoURL = data.videoURL;
    this.category = data.category;
    this.createDate = data.createDate;
    this.dateEstablish = data.dateEstablish;
    this.rate = data.rate;
    this.numRate = data.numRate;
    this.rateText = data.rateText;
    this.status = data.status;
    this.favorite = data.favorite;
    this.address = data.address;
    this.zipCode = data.zipCode;
    this.phone = data.phone;
    this.fax = data.fax;
    this.email = data.email;
    this.website = data.website;
    this.description = data.description;
    this.color = data.color;
    this.icon = data.icon;
    this.tags = data.tags;
    this.priceMin = data.priceMin;
    this.priceMax = data.priceMax;
    this.country = data.country;
    this.city = data.city;
    this.state = data.state;
    this.author = data.author;
    this.galleries = data.galleries;
    this.features = data.features;
    this.related = data.related;
    this.latest = data.latest;
    this.openHours = data.openHours;
    this.socials = data.socials;
    this.attachments = data.attachments;
    this.location = data.location;
    this.link = data.link;
    this.bookingUse = data.bookingUse;
    this.price = data.price;
    this.priceDisplay = data.priceDisplay;
    this.bookingStyle = data.bookingStyle;
  }

  static fromJson({json, setting = SettingModel.fromDefault()}) {
    try {
      if (typeof json !== 'object') {
        throw 'json ProductModel is not object';
      }

      let videoURL = '';
      let dateEstablish = '';
      let status = '';
      let address = '';
      let phone = '';
      let email = '';
      let website = '';
      let tags = [];
      let priceMin = '';
      let priceMax = '';
      let galleries = [];
      let features = [];
      let openHours = [];
      let socials = [];
      let attachments = [];
      let location;

      if (setting?.useViewVideo === true) {
        videoURL = json.video_url ?? '';
      }
      if (setting?.useViewDateEstablish === true) {
        dateEstablish = json.date_establish ?? '';
      }
      if (setting?.useViewStatus === true) {
        status = json.status ?? '';
      }
      if (setting?.useViewAddress === true) {
        address = json.address ?? '';
      }
      if (setting?.useViewPhone === true) {
        phone = json.phone ?? '';
      }
      if (setting?.useViewEmail === true) {
        email = json.email ?? '';
      }
      if (setting?.useViewWebsite === true) {
        website = json.website ?? '';
      }
      if (setting?.useViewTags === true) {
        tags = (json.tags ?? []).map(item => {
          return CategoryModel.fromJson(item);
        });
      }
      if (setting?.useViewPrice === true) {
        priceMin = json.price_min ?? '';
        priceMax = json.price_max ?? '';
      }
      if (setting?.useViewGalleries === true) {
        galleries = (json.galleries ?? []).map(item => {
          return ImageModel.fromJson(item);
        });
      }
      if (setting?.useViewFeature === true) {
        features = (json.features ?? []).map(item => {
          return CategoryModel.fromJson(item);
        });
      }
      if (setting?.useViewOpenHours === true) {
        openHours = (json.opening_hour ?? []).map(item => {
          return OpenTimeModel.fromJson(item);
        });
      }
      if (
        setting?.useViewSocial === true &&
        typeof json.social_network === 'object'
      ) {
        socials = json.social_network;
      }
      if (setting?.useViewAttachment === true) {
        attachments = (json.attachments ?? []).map(item => {
          return FileModel.fromJson(item);
        });
      }
      if (json.latitude != null && setting?.useViewMap === true) {
        location = LocationModel.fromJson({
          name: json.post_title ?? '',
          latitude: json.latitude ?? '',
          longitude: json.longitude ?? '',
        });
      }

      let priceDisplay = '';
      const bookingUse = json.booking_use === true;
      if (bookingUse && json.booking_price_display) {
        priceDisplay = json.booking_price_display;
      }

      return new ProductModel({
        id: parseInt(json.ID ?? '0'),
        title: json.post_title ?? '',
        image: ImageModel.fromJson(json.image),
        videoURL,
        category: CategoryModel.fromJson(json.category),
        createDate: json.post_date ?? '',
        dateEstablish,
        rate: parseFloat(json.rating_avg ?? '0'),
        numRate: parseInt(json.rating_count ?? '0'),
        rateText: json.post_status ?? '',
        status,
        favorite: json.wishlist === true,
        address,
        zipCode: json.zip_code ?? '',
        phone,
        fax: json.fax ?? '',
        email,
        website,
        description: json.post_excerpt ?? '',
        color: json.color ?? '',
        icon: json.icon ?? '',
        tags,
        priceMin,
        priceMax,
        country: CategoryModel.fromJson(json.location?.country),
        city: CategoryModel.fromJson(json.location?.city),
        state: CategoryModel.fromJson(json.location?.state),
        author: UserModel.fromJson(json.author),
        galleries,
        features,
        related: (json.related ?? []).map(item => {
          return ProductModel.fromJson({json: item, setting});
        }),
        latest: (json.lastest ?? []).map(item => {
          return ProductModel.fromJson({json: item, setting});
        }),
        openHours,
        socials,
        attachments,
        location,
        link: json.guid ?? '',
        bookingUse,
        price: json.booking_price,
        priceDisplay,
        bookingStyle: json.booking_style ?? '',
      });
    } catch (e) {
      console.log(e.toString());
    }
  }

  static fromNotification({json, setting = SettingModel.fromDefault()}) {
    try {
      if (typeof json !== 'object') {
        throw 'json ProductModel is not object';
      }
      return new ProductModel({
        id: parseInt(json.ID ?? '0'),
        title: json.post_title ?? '',
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
