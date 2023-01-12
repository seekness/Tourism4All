import BankAccountModel from './bank_account';
import PaymentMethodModel from './payment_method';

export default class BookingPaymentModel {
  constructor(data) {
    this.use = data.use;
    this.term = data.term;
    this.method = data.method;
    this.listMethod = data.listMethod;
    this.listAccount = data.listAccount;
  }

  update(data) {
    this.method = data?.method ?? this.method;
  }

  validate() {
    if (!this.method) {
      return 'please_select_payment_method';
    }
  }

  clone() {
    return new BookingPaymentModel(this);
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json BookingPaymentModel is not object';
      }
      const listMethod = (json.list ?? []).map(item => {
        return PaymentMethodModel.fromJson(item);
      });
      return new BookingPaymentModel({
        use: json.use ?? false,
        term: json.term_condition_page ?? '',
        method: json.use ? listMethod[0] : null,
        listMethod,
        listAccount: (json.bank_account_list ?? []).map(item => {
          return BankAccountModel.fromJson(item);
        }),
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
