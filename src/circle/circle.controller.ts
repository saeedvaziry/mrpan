import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import { TwitterService } from 'src/twitter/twitter.service';
import { UsersService } from 'src/users/users.service';
import { CircleService } from './circle.service';
import { Response } from 'express';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import * as fs from 'fs';

@Controller()
export class CircleController {
  constructor(
    private readonly usersService: UsersService,
    private readonly twitterService: TwitterService,
    private readonly circleService: CircleService,
  ) {}

  @Get('/:username')
  @Render('user')
  async user(@Param() param, @Query() query) {
    let user = await this.usersService.findOne({
      where: { username: param.username },
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    let bg = query.bg ? query.bg : '00b4f7';
    return {
      user: user,
      title: user.name,
      username: user.username,
      background: bg,
      fullImageUrl: encodeURI(
        process.env.APP_URL + `/${user.username}/circle.png?bg=${bg}`,
      ),
    };
  }

  @Get('/:username/circle.png')
  async circle(@Param() param, @Query() query, @Res() res: Response) {
    let user = await this.usersService.findOne({
      where: { username: param.username },
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    let circle;
    let path =
      __dirname +
      '/../../circles/' +
      user.username +
      `-${query.bg ? query.bg : '00b4f7'}` +
      '.png';
    if (
      fs.existsSync(path) &&
      user.circleExpiresAt &&
      new Date(user.circleExpiresAt).getTime() > new Date().getTime()
    ) {
      let image = fs.readFileSync(path);
      image = Buffer.from(image);
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': image.length,
      });
      res.end(image);
      return;
    } else {
      circle = await this.twitterService.generateCircle(user);
      user = await this.usersService.update(user.id, <UpdateUserDto>{
        ...user,
        circleExpiresAt: new Date(
          new Date().setHours(new Date().getHours() + 12),
        ),
      });
    }
    let image = await this.circleService.render(
      [
        {
          distance: 280,
          count: 8,
          radius: 60,
          users: circle,
        },
        {
          distance: 0,
          count: 1,
          radius: 100,
          users: [
            {
              avatar: user.avatar,
              username: user.username,
              name: user.name,
            },
          ],
        },
      ],
      query.bg ? `#${query.bg}` : '#00b4f7',
      user.username,
    );
    image.pipe(res);
  }
}
