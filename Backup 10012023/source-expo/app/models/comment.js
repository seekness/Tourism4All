export default class CommentModel {
  constructor(json) {
    this.id = json?.comment_ID;
    this.author = json?.comment_author;
    this.authorEmail = json?.comment_author_email;
    this.authorImage = json?.comment_author_image;
    this.content = json?.comment_content;
    this.date = json?.comment_date;
    this.rate = json?.rate;
  }
}
