export default class UserModel {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.nickname = json.nickname;
    this.image = json.image;
    this.url = json.url;
    this.level = json.level;
    this.description = json.description;
    this.tag = json.tag;
    this.rate = json.rate;
    this.comment = json.comment;
    this.total = json.total;
    this.token = json.token;
    this.email = json.email;
  }

  get dataNotEmpty() {
    const data = this;
    Object.keys(data).forEach(key => !data[key] && delete data[key]);
    return data;
  }

  static fromJson(json) {
    try {
      if (typeof json !== 'object') {
        throw 'json UserModel is not object';
      }
      return new UserModel({
        id: json.id ?? 0,
        name: json.display_name ?? '',
        nickname: json.user_nicename ?? '',
        image: json.user_photo ?? '',
        url: json.user_url ?? '',
        level: json.user_level ?? 0,
        description: json.description ?? '',
        tag: json.tag ?? '',
        rate: parseFloat(json.rating_avg ?? '0'),
        comment: parseInt(json.total_comment ?? '0'),
        total: parseInt(json.total_post ?? '0'),
        token: json.token,
        email: json.user_email ?? '',
      });
    } catch (e) {
      console.log(e.toString());
    }
  }

  get toJson() {
    return {
      id: this.id,
      display_name: this.name,
      user_nicename: this.nickname,
      user_photo: this.image,
      user_url: this.url,
      user_level: this.level,
      description: this.description,
      tag: this.tag,
      rating_avg: this.rate,
      total_comment: this.rate,
      total: this.total,
      user_email: this.email,
    };
  }
}
