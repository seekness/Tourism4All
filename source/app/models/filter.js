import {getCurrentLocation} from '@utils';

export default class FilterModel {
  constructor(data) {
    this.categories = data.categories;
    this.features = data.features;
    this.country = data.country;
    this.city = data.city;
    this.state = data.state;
    this.distance = data.distance;
    this.minPrice = data.minPrice;
    this.maxPrice = data.maxPrice;
    this.color = data.color;
    this.sort = data.sort;
    this.startHour = data.startHour;
    this.endHour = data.endHour;
  }

  set setCategory(item) {
    switch (item.type) {
      case 'category':
        this.categories.push?.(item);
        break;
      case 'feature':
        this.features.push?.(item);
        break;
      case 'location':
        this.country = item;
        break;
    }
  }

  static fromSettings(setting) {
    try {
      return new FilterModel({
        categories: [],
        features: [],
        sort: setting.sort?.[0],
        startHour: setting.startHour,
        endHour: setting.endHour,
      });
    } catch (e) {
      console.log(e.toString());
    }
  }

  update({
    categories,
    features,
    country,
    city,
    state,
    distance,
    minPrice,
    maxPrice,
    color,
    sort,
    startHour,
    endHour,
  }) {
    if (categories) {
      this.categories = categories;
    }
    if (features) {
      this.features = features;
    }
    if (country) {
      this.country = country;
    }
    if (city) {
      this.city = city;
    }
    if (state) {
      this.state = state;
    }
    if (distance) {
      this.distance = distance;
    }
    if (minPrice) {
      this.minPrice = minPrice;
    }
    if (maxPrice) {
      this.maxPrice = maxPrice;
    }
    if (color) {
      this.color = color;
    }
    if (sort) {
      this.sort = sort;
    }
    if (startHour) {
      this.startHour = startHour;
    }
    if (endHour) {
      this.endHour = endHour;
    }
  }

  async getParams() {
    const params = {};
    params.category = this.categories.map?.(item => {
      return item.id;
    });
    params.feature = this.features.map?.(item => {
      return item.id;
    });
    if (this.country) {
      params.location = this.country.id;
    }
    if (this.city) {
      params.location = this.city.id;
    }
    if (this.state) {
      params.location = this.state.id;
    }
    if (this.distance) {
      params.distance = this.distance;
    }
    if (this.minPrice) {
      params.price_min = parseFloat(this.minPrice);
    }
    if (this.maxPrice) {
      params.price_max = parseFloat(this.maxPrice);
    }
    if (this.color) {
      params.color = this.color;
    }
    if (this.sort) {
      params.orderby = this.sort.field;
      params.order = this.sort.value;
    }
    if (this.startHour) {
      params.start_time = this.startHour;
    }
    if (this.endHour) {
      params.end_time = this.endHour;
    }

    const result = await getCurrentLocation();
    if (result) {
      params.latitude = result.latitude;
      params.longitude = result.longitude;
    }
    return params;
  }
}
