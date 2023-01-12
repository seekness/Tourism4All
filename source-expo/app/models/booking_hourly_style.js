import ScheduleModel from './schedule';
import BookingStyleModel from './booking_style';
import moment from 'moment';

export default class BookingHourlyStyleModel extends BookingStyleModel {
  constructor(data) {
    super(data);
    this.style = 'hourly';
    this.startDate = data.startDate;
    this.schedule = data.schedule;
    this.scheduleOptions = data.scheduleOptions;
  }

  get params() {
    return {
      ...super.params,
      booking_style: this.style,
      start_date: this.startDate?.format?.('YYYY-MM-DD'),
      start_time: this.schedule?.start,
      end_time: this.schedule?.end,
    };
  }

  update(data) {
    super.update(data);
    this.startDate = data?.startDate ?? this.startDate;
    this.schedule = data?.schedule ?? this.schedule;
    this.scheduleOptions = data?.scheduleOptions ?? this.scheduleOptions;
  }

  validate() {
    if (super.validate()) {
      return super.validate();
    }
    if (!this.schedule) {
      return 'please_select_schedule_time';
    }
    if (!this.startDate) {
      return 'please_select_start_date';
    }
  }

  clone() {
    return new BookingHourlyStyleModel(this);
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json BookingHourlyStyleModel is not object';
      }
      return new BookingHourlyStyleModel({
        price: json.price ?? '',
        startDate: moment(json.start_date),
        scheduleOptions: (json.select_options ?? []).map(item => {
          return ScheduleModel.fromJson(item);
        }),
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
