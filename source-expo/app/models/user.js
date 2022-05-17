export default class UserModel {
  constructor(json) {
    this.id = json?.id;
    this.name = json?.display_name;
    this.nickname = json?.user_nicename;
    this.image = json?.user_photo;
    this.link = json?.user_url;
    this.level = json?.user_level;
    this.description = json?.description;
    this.tag = json?.tag;
    this.rate = json?.rate;
    this.token = json?.token;
    this.email = json?.user_email;
  }
}
