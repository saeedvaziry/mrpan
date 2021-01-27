import { Strategy } from 'passport-twitter';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private authService: AuthService) {
    super({
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: `${process.env.APP_URL}/auth/twitter/callback`,
      includeEmail: true,
    });
  }

  async validate(token: string, tokenSecret: string, profile: any, cb) {
    const user = await this.authService.validateTwitter(
      token,
      tokenSecret,
      profile,
    );
    return cb(null, user.id);
  }
}
