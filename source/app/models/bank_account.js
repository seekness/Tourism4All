export default class BankAccountModel {
  constructor(data) {
    this.name = data.name;
    this.number = data.number;
    this.bankName = data.bankName;
    this.bankCode = data.bankCode;
    this.bankIban = data.bankIban;
    this.bankSwift = data.bankSwift;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json BankAccountModel is not object';
      }
      return new BankAccountModel({
        name: json.acc_name ?? '',
        number: json.acc_number ?? '',
        bankName: json.bank_name ?? '',
        bankCode: json.bank_sort_code ?? '',
        bankIban: json.bank_iban ?? '',
        bankSwift: json.bank_swift ?? '',
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
