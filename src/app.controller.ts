import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard } from './auth/authenticated.guard';

@Controller()
export class AppController {
  @Get('/')
  index(@Req() req: Request, @Res() res: Response) {
    if (req.isAuthenticated()) {
      return res.redirect('/home');
    }
    res.render('index', {
      title: process.env.APP_NAME,
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  home(@Req() req: Request) {
    return {
      title: process.env.APP_NAME,
      user: req.user,
    };
  }

  @Get('/privacy')
  @Render('privacy')
  privacy(@Req() req: Request) {
    return {
      title: process.env.APP_NAME,
      user: req.user,
    };
  }

  @Get('/contact')
  @Render('contact')
  contact(@Req() req: Request) {
    return {
      title: process.env.APP_NAME,
      user: req.user,
    };
  }

  @Get('/cookie')
  @Render('cookie')
  cookie(@Req() req: Request) {
    return {
      title: process.env.APP_NAME,
      user: req.user,
    };
  }
}
