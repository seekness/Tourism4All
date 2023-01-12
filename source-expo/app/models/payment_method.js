export default class PaymentMethodModel {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.instruction = data.instruction;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json PaymentMethodModel is not object';
      }
      return new PaymentMethodModel({
        id: json.method ?? '',
        title: json.title ?? '',
        description: json.desc ?? '',
        instruction: json.instruction ?? '',
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
