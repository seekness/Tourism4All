export default class ScheduleModel {
  constructor(data) {
    this.view = data.view;
    this.start = data.start;
    this.end = data.end;
  }

  get title() {
    if (this.view) {
      return this.view;
    }
    return `${this.start} - ${this.end}`;
  }

  static formatTime(value) {
    if (value && value !== '0') {
      return value;
    }
    return '00:00';
  }

  static fromString(string) {
    try {
      if (typeof string !== 'string') {
        throw 'json ScheduleModel is not string';
      }
      const arr = string.split(' - ');
      return new ScheduleModel({
        start: arr[0] ?? '00:00',
        end: arr[1] ?? '00:00',
      });
    } catch (e) {
      console.log(e.toString());
    }
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json ScheduleModel is not object';
      }
      return new ScheduleModel({
        view: json.format ?? '',
        start: this.formatTime(json.start),
        end: this.formatTime(json.end),
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
