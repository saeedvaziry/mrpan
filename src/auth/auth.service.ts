import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateTwitter(token: string, tokenSecret: string, profile: any) {
    let user = await this.usersService.findOne({
      where: { twitterId: profile.id },
    });
    let fields = {
      twitterId: profile.id,
      name: profile._json.name,
      email: profile._json.email,
      username: profile._json.screen_name,
      avatar: profile._json.profile_image_url.replace('normal', '400x400'),
      token: token,
      tokenSecret: tokenSecret,
    };
    if (user) {
      user = await this.usersService.update(user.id, <UpdateUserDto>{
        ...fields,
      });
    } else {
      user = await this.usersService.create(<CreateUserDto>{ ...fields });
    }
    return user;
  }
}
