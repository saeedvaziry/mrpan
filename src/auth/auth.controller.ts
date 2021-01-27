import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { TwitterGuard } from './twitter.guard';

@Controller('auth')
export class AuthController {
  @Get('twitter')
  @UseGuards(TwitterGuard)
  async twitter() {}

  @Get('twitter/callback')
  @UseGuards(TwitterGuard)
  async twitterCallback(@Res() res: Response) {
    res.redirect('/home');
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
