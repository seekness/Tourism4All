import moment from 'moment';
import {UserModel} from '@models';

export default class CommentModel {
  constructor(json) {
    this.id = json.id;
    this.user = json.user;
    this.content = json.content;
    this.postName = json.postName;
    this.createDate = json.createDate;
    this.rate = json.rate;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json CommentModel is not object';
      }
      return new CommentModel({
        id: json.comment_ID ?? 0,
        user: UserModel.fromJson({
          id: json.user_id ?? 0,
          user_email: json.comment_author_email,
          display_name: json.comment_author,
          user_photo: json.comment_author_image,
        }),
        postName: json.post_title ?? '',
        content: json.comment_content ?? '',
        createDate: moment(json.comment_date),
        rate: parseFloat(json.rate ?? '0'),
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
