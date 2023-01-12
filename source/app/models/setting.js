import {CategoryModel, SortModel} from '@models';

export default class SettingModel {
  constructor(data) {
    this.categories = data.categories;
    this.features = data.features;
    this.locations = data.locations;
    this.sort = data.sort;
    this.perPage = data.perPage;
    this.listMode = data.listMode;
    this.enableSubmit = data.enableSubmit;
    this.minPrice = data.minPrice;
    this.maxPrice = data.maxPrice;
    this.color = data.color;
    this.unit = data.unit;
    this.startHour = data.startHour;
    this.endHour = data.endHour;
    this.useViewAddress = data.useViewAddress;
    this.useViewPhone = data.useViewPhone;
    this.useViewEmail = data.useViewEmail;
    this.useViewWebsite = data.useViewWebsite;
    this.useViewSocial = data.useViewSocial;
    this.useViewStatus = data.useViewStatus;
    this.useViewDateEstablish = data.useViewDateEstablish;
    this.useViewGalleries = data.useViewGalleries;
    this.useViewAttachment = data.useViewAttachment;
    this.useViewVideo = data.useViewVideo;
    this.useViewMap = data.useViewMap;
    this.useViewPrice = data.useViewPrice;
    this.useViewOpenHours = data.useViewOpenHours;
    this.useViewTags = data.useViewTags;
    this.useViewFeature = data.useViewFeature;
    this.useViewAdmob = data.useViewAdmob;
  }

  static fromDefault() {
    return new SettingModel({
      categories: [],
      features: [],
      locations: [],
      sort: [],
      perPage: 20,
      listMode: 'list',
      enableSubmit: true,
      minPrice: 0.0,
      maxPrice: 100.0,
      color: [],
      unit: 'USD',
      startHour: '08:00',
      endHour: '15:00',
      useViewAddress: true,
      useViewPhone: true,
      useViewEmail: true,
      useViewWebsite: true,
      useViewSocial: true,
      useViewStatus: true,
      useViewDateEstablish: true,
      useViewGalleries: true,
      useViewAttachment: true,
      useViewVideo: true,
      useViewMap: true,
      useViewPrice: true,
      useViewOpenHours: true,
      useViewTags: true,
      useViewFeature: true,
      useViewAdmob: true,
    });
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json SettingModel is not object';
      }
      const settings = json.settings ?? {};
      const viewOptions = json.view_option ?? {};
      return new SettingModel({
        categories: (json.categories ?? [])?.map(item => {
          return CategoryModel.fromJson(item);
        }),
        features: (json.features ?? [])?.map(item => {
          return CategoryModel.fromJson(item);
        }),
        locations: (json.locations ?? [])?.map(item => {
          return CategoryModel.fromJson(item);
        }),
        sort: (json.place_sort_option ?? [])?.map(item => {
          return SortModel.fromJson(item);
        }),
        perPage: settings.per_page ?? 20,
        listMode: settings.list_mode ?? 'list',
        enableSubmit: settings.submit_listing ?? true,
        minPrice: parseFloat(settings.price_min ?? '0'),
        maxPrice: parseFloat(settings.price_max ?? '0'),
        color: settings.color_option ?? [],
        unit: settings.unit_price ?? 'USD',
        startHour: settings.time_min,
        endHour: settings.time_min,
        useViewAddress: viewOptions.view_address_use ?? true,
        useViewPhone: viewOptions.view_phone_use ?? true,
        useViewEmail: viewOptions.view_email_use ?? true,
        useViewWebsite: viewOptions.view_website_use ?? true,
        useViewSocial: viewOptions.social_network_use ?? true,
        useViewStatus: viewOptions.view_status_use ?? true,
        useViewDateEstablish: viewOptions.view_date_establish_use ?? true,
        useViewGalleries: viewOptions.view_galleries_use ?? true,
        useViewAttachment: viewOptions.view_attachment_use ?? true,
        useViewVideo: viewOptions.view_video_url_use ?? true,
        useViewMap: viewOptions.view_map_use ?? true,
        useViewPrice: viewOptions.view_price_use ?? true,
        useViewOpenHours: viewOptions.view_opening_hour_use ?? true,
        useViewTags: viewOptions.view_tags_use ?? true,
        useViewFeature: viewOptions.view_feature_use ?? true,
        useViewAdmob: viewOptions.view_admob_use ?? true,
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
