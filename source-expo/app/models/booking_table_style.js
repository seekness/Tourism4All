import BookingStyleModel from './booking_style';
import moment from 'moment';

export default class BookingTableStyleModel extends BookingStyleModel {
  constructor(data) {
    super(data);
    this.startTime = data.startTime;
    this.startDate = data.startDate;
    this.tableOptions = data.tableOptions;
    this.selected = [];
  }

  get params() {
    return {
      ...super.params,
      booking_style: this.style,
      start_date: this.startDate?.format?.('YYYY-MM-DD'),
      start_time: this.startTime,
      table_num: this.selected.map(item => item.id),
    };
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
    if (this.selected?.length === 0) {
      return 'please_select_table';
    }
  }

  clone() {
    return new BookingTableStyleModel(this);
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json BookingTableStyleModel is not object';
      }
      return new BookingTableStyleModel({
        price: json.price ?? '',
        startTime: moment(json.start_time),
        startDate: json.start_date,
        tableOptions: json.select_options ?? [],
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
