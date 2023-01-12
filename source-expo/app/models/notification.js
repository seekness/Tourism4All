import {BookingModel, ProductModel} from '@models';

export default class NotificationModel {
  constructor(data) {
    this.action = data.action;
    this.type = data.type;
    this.target = data.target;
    this.item = data.item;
    this.authentication = data.authentication;
  }

  static factoryNotification(json) {
    let item;
    let authentication = false;
    switch (json.type) {
      case 'booking':
        item = BookingModel.fromNotification(json);
        authentication = true;
        return {target: 'BookingDetail', item, authentication};
      case 'listing':
        item = ProductModel.fromNotification({json});
        return {target: 'ProductDetail', item};
      default:
        return {target: null, item: null};
    }
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json NotificationModel is not object';
      }
      const {target, item, authentication} = this.factoryNotification(json);
      return new NotificationModel({
        action: json.action,
        type: json.type,
        target,
        item,
        authentication,
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
