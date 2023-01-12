import BookingStyleModel from './booking_style';

export default class BookingSlotStyleModel extends BookingStyleModel {
  constructor(data) {
    super(data);
    this.style = 'slot';
  }

  get params() {
    return {
      ...super.params,
      booking_style: this.style,
    };
  }

  update(data) {
    super.update(data);
  }

  validate() {
    if (super.validate()) {
      return super.validate();
    }
  }

  clone() {
    return new BookingSlotStyleModel(this);
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json BookingSlotStyleModel is not object';
      }
      return new BookingSlotStyleModel({
        price: json.price ?? '',
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
