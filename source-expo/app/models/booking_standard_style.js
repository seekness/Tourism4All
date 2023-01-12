import BookingStyleModel from './booking_style';
import moment from 'moment';

export default class BookingStandardStyleModel extends BookingStyleModel {
  constructor(data) {
    super(data);
    this.style = 'standard';
    this.startTime = data.startTime;
    this.startDate = data.startDate;
  }

  get params() {
    return {
      ...super.params,
      booking_style: this.style,
      start_date: this.startDate?.format?.('YYYY-MM-DD'),
      start_time: this.startTime,
    };
  }

  update(data) {
    super.update(data);
    this.startTime = data?.startTime ?? this.startTime;
    this.startDate = data?.startDate ?? this.startDate;
  }

  validate() {
    if (super.validate()) {
      return super.validate();
    }
    if (!this.startTime) {
      return 'please_select_start_time';
    }
    if (!this.startDate) {
      return 'please_select_start_date';
    }
  }

  clone() {
    return new BookingStandardStyleModel(this);
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json BookingStandardStyleModel is not object';
      }
      return new BookingStandardStyleModel({
        price: json.price ?? '',
        startTime: json.start_time,
        startDate: moment(json.start_date),
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
