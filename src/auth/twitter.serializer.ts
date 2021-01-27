import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TwitterSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(userId: string, done: CallableFunction) {
    return done(null, userId);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    return this.usersService
      .findOneById(Number(userId))
      .then((user) => done(null, user))
      .catch((error) => done(error));
  }
}
