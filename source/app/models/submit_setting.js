import {CategoryModel} from './index';

export default class SubmitSettingModel {
  constructor(data) {
    this.categories = data.categories;
    this.features = data.features;
    this.countries = data.countries;
    this.states = data.states;
    this.cities = data.cities;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json SubmitSettingModel is not object';
      }
      return new SubmitSettingModel({
        categories: (json.categories ?? [])?.map(item => {
          return CategoryModel.fromJson(item);
        }),
        features: (json.features ?? [])?.map(item => {
          return CategoryModel.fromJson(item);
        }),
        countries: (json.countries ?? [])?.map(item => {
          return CategoryModel.fromJson(item);
        }),
        states: (json.states ?? [])?.map(item => {
          return CategoryModel.fromJson(item);
        }),
        cities: (json.cities ?? [])?.map(item => {
          return CategoryModel.fromJson(item);
        }),
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
