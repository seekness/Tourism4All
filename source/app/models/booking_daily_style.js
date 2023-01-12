import BookingStyleModel from './booking_style';
import moment from 'moment';

export default class BookingDailyStyleModel extends BookingStyleModel {
  constructor(data) {
    super(data);
    this.style = 'daily';
    this.startTime = data.startTime;
    this.startDate = data.startDate;
    this.endTime = data.endTime;
    this.endDate = data.endDate;
  }

  get params() {
    const params = {
      ...super.params,
      booking_style: this.style,
      start_date: this.startDate?.format?.('YYYY-MM-DD'),
      start_time: this.startTime,
    };
    if (this.endDate) {
      params.end_date = this.endDate?.format?.('YYYY-MM-DD');
    }
    if (this.endTime) {
      params.end_time = this.endTime;
    }
    return params;
  }

  update(data) {
    super.update(data);
    this.startTime = data?.startTime ?? this.startTime;
    this.startDate = data?.startDate ?? this.startDate;
    this.endTime = data?.endTime ?? this.endTime;
    this.endDate = data?.endDate ?? this.endDate;
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
    return new BookingDailyStyleModel(this);
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json BookingDailyStyleModel is not object';
      }
      return new BookingDailyStyleModel({
        price: json.price ?? '',
        startTime: json.start_time,
        startDate: moment(json.start_date),
        endTime: json.end_time,
        endDate: moment(json.end_date),
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
