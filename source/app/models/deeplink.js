import {BookingModel, ProductModel, UserModel} from '@models';
import {URL} from 'react-native-url-polyfill';

export default class DeeplinkModel {
  constructor(data) {
    this.action = data.action;
    this.type = data.type;
    this.target = data.target;
    this.item = data.item;
    this.authentication = data.authentication;
  }

  get link() {
    return `listar://qrcode?type=${this.type}&action=${this.action}&id=${this.item.id}`;
  }

  static factoryData(uri) {
    const type = uri?.searchParams.get('type');
    const id = uri?.searchParams.get('id');

    let item;
    let authentication = false;
    switch (type) {
      case 'listing':
        item = ProductModel.fromNotification({json: {ID: id}});
        return {target: 'ProductDetail', item, authentication};
      case 'booking':
        item = BookingModel.fromNotification({booking_id: id});
        authentication = true;
        return {target: 'BookingDetail', item, authentication};
      case 'profile':
        item = UserModel.fromJson({id});
        authentication = true;
        return {target: 'Profile', item, authentication};
      case 'review':
        item = ProductModel.fromNotification({json: {ID: id}});
        authentication = true;
        return {target: 'Review', item, authentication};

      default:
        return {target: null, item: null, authentication};
    }
  }

  static fromString(value) {
    try {
      if (typeof value !== 'string') {
        throw 'value DeeplinkModel is not string';
      }
      const uri = new URL(value);
      const {target, item, authentication} = this.factoryData(uri);

      return new DeeplinkModel({
        action: uri?.searchParams.get('action'),
        type: uri?.searchParams.get('type'),
        target,
        item,
        authentication,
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
