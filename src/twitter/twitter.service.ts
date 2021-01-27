import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import * as Twitter from 'twitter';

let users = [];
let circle = [];

@Injectable()
export class TwitterService {
  async generateCircle(user) {
    users = [];
    circle = [];
    await this.calculateMentions(user);
    await this.calculateFavorites(user);
    for (let i = 0; i < Object.keys(users).length; i++) {
      circle.push(users[Object.keys(users)[i]]);
    }
    circle.sort(function (a, b) {
      return b.score - a.score;
    });
    return circle.slice(0, 10);
  }

  getClient(user: User): Twitter {
    return new Twitter({
      consumer_key: process.env.TWITTER_CLIENT_ID,
      consumer_secret: process.env.TWITTER_CLIENT_SECRET,
      access_token_key: user.token,
      access_token_secret: user.tokenSecret
    });
  }

  async calculateMentions(user) {
    let statuses = await this.getClient(user).get('statuses/mentions_timeline', {
      count: 100
    });

    return new Promise(function (resolve) {
      statuses.map((item) => {
        let user = item.user;
        if (users[user.screen_name]) {
          users[user.screen_name].score += 0.5;
        } else {
          users[user.screen_name] = {
            name: user.name,
            username: user.screen_name,
            avatar: user.profile_image_url_https.replace('normal', '400x400'),
            score: 0.5
          };
        }
      });
      resolve(true);
    });
  }

  async calculateFavorites(user) {
    let statuses = await this.getClient(user).get('favorites/list', {
      count: 100
    });

    return new Promise(function (resolve) {
      statuses.map((item: any) => {
        let user = item.user;
        if (users[user.screen_name]) {
          users[user.screen_name].score += 1;
        } else {
          users[user.screen_name] = {
            name: user.name,
            username: user.screen_name,
            avatar: user.profile_image_url_https.replace('normal', '400x400'),
            score: 1
          };
        }
      });
      resolve(true);
    });
  }
}
