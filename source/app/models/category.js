import {ImageModel} from '@models';

const CategoryType = {
  listar_feature: 'feature',
  listar_location: 'location',
  listar_category: 'category',
};

export default class CategoryModel {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.count = data.count;
    this.image = data.image;
    this.icon = data.icon;
    this.color = data.color;
    this.type = data.type;
    this.hasChild = data.hasChild;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json CategoryModel is not object';
      }
      const image = ImageModel.fromJson(json.image);
      return new CategoryModel({
        id: json.term_id ?? json.id ?? 0,
        title: json.name ?? 'Unknown',
        count: json.count ?? 0,
        image: image ?? '',
        icon: json.icon ?? '',
        color: json.color ?? '',
        type: CategoryType[json.taxonomy] ?? 'category',
        hasChild: json.has_child ?? false,
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
