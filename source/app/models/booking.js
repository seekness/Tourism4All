import moment from 'moment/moment';
import {BookingResourceModel} from '@models';

export default class BookingModel {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.date = data.date;
    this.status = data.status;
    this.statusColor = data.statusColor;
    this.paymentName = data.paymentName;
    this.payment = data.payment;
    this.transactionID = data.transactionID;
    this.total = data.total;
    this.currency = data.currency;
    this.totalDisplay = data.totalDisplay;
    this.billFirstName = data.billFirstName;
    this.billLastName = data.billLastName;
    this.billPhone = data.billPhone;
    this.billEmail = data.billEmail;
    this.billAddress = data.billAddress;
    this.resource = data.resource;
    this.allowCancel = data.allowCancel;
    this.allowPayment = data.allowPayment;
    this.createdOn = data.createdOn;
    this.paidOn = data.paidOn;
    this.createdVia = data.createdVia;
    this.createdBy = data.createdBy;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json BookingModel is not object';
      }
      let createdOn;
      let paidOn;

      if (json.created_on) {
        if (moment(json.created_on).isValid()) {
          createdOn = moment(json.created_on);
        } else {
          createdOn = moment(json.created_on, 'MMM YY, YYYY hh:mm a');
        }
      }
      if (json.paid_date) {
        if (moment(json.paid_date).isValid()) {
          paidOn = moment(json.paid_date);
        } else {
          paidOn = moment(json.paid_date, 'MMM YY, YYYY hh:mm a');
        }
      }

      return new BookingModel({
        id: json.booking_id ?? 0,
        title: json.title ?? '',
        date: moment(json.date),
        status: json.status_name ?? '',
        statusColor: json.status_color ?? '',
        paymentName: json.payment_name ?? '',
        payment: json.payment ?? '',
        transactionID: json.txn_id ?? '',
        total: json.total ?? 0,
        currency: json.currency ?? '',
        totalDisplay: json.total_display ?? 0,
        billFirstName: json.billing_first_name ?? '',
        billLastName: json.billing_last_name ?? '',
        billPhone: json.billing_phone ?? '',
        billEmail: json.billing_email ?? '',
        billAddress: json.billing_address_1 ?? '',
        resource: (json.resources ?? [])?.map?.(item => {
          return BookingResourceModel.fromJson(item);
        }),
        allowCancel: json.allow_cancel ?? false,
        allowPayment: json.allow_payment ?? false,
        createdOn: createdOn,
        paidOn: paidOn,
        createdVia: json.create_via ?? '',
        createdBy: `${json.first_name} ${json.last_name}`,
      });
    } catch (e) {
      console.log(e.toString());
    }
  }

  static fromNotification(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json BookingModel is not object';
      }

      return new BookingModel({
        id: json.booking_id ?? 0,
        title: json.title ?? '',
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
