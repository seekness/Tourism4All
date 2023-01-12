export default class BookingStyleModel {
  constructor(data) {
    this.price = data.price;
    this.adult = data.adult ?? 0;
    this.children = data.children ?? 0;
  }

  get params() {
    return {
      adult: this.adult,
      children: this.children,
    };
  }

  update(data) {
    this.price = data?.price ?? this.price;
    this.adult = data?.adult ?? this.adult;
    this.children = data?.children ?? this.children;
  }

  validate() {
    if (!this.adult) {
      return 'please_select_adult';
    }
  }
}
