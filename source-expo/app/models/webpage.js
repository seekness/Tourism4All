export default class WebPageModel {
  constructor(data) {
    this.title = data.title;
    this.url = data.url;
    this.handleUrl = data.handleUrl ?? [];
    this.dismissOnHandle = data.dismissOnHandle ?? true;
    this.callback = data.callback;
    this.cacheEnabled = data.cacheEnabled ?? false;
  }
}
