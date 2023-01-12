export default class BookingResourceModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.quantity = data.quantity;
    this.total = data.total;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json BookingResourceModel is not object';
      }
      return new BookingResourceModel({
        id: json.id ?? 0,
        name: json.name ?? '',
        quantity: json.qty ?? 0,
        total: json.total ?? 0,
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
