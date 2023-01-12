export default class NotificationModel {
  constructor(json) {
    this.action = json?.action;
    this.id = json?.id;
    this.title = json?.title;
  }
}
