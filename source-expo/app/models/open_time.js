import {ScheduleModel} from '@models';

export default class OpenTimeModel {
  constructor(data) {
    this.key = data.key;
    this.dayOfWeek = data.dayOfWeek;
    this.schedule = data.schedule;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json OpenTimeModel is not object';
      }
      return new OpenTimeModel({
        key: json.key ?? 'mon',
        dayOfWeek: json.day_of_week ?? 1,
        schedule: (json.schedule ?? []).map(item => {
          return ScheduleModel.fromJson(item);
        }),
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
