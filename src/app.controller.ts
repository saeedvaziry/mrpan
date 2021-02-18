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

  @Get('/donors-list')
  @Render('donors')
  donors(@Req() req: Request) {
    return {
      title: process.env.APP_NAME,
      user: req.user,
      donors: JSON.stringify([
        {
          avatar : 'https://pbs.twimg.com/profile_images/1334251286292787201/U8OJ_Jcb_400x400.jpg',
          name: 'saeed Vaziri',
          username: 'saeedVaziri',
          amount: 500,
        },
        {
          avatar : 'https://pbs.twimg.com/profile_images/1334251286292787201/U8OJ_Jcb_400x400.jpg',
          name: 'saeed Vaziri',
          username: '222',
          amount: 50,
        },
        {
          avatar : 'https://pbs.twimg.com/profile_images/1334251286292787201/U8OJ_Jcb_400x400.jpg',
          name: 'saeed Vaziri',
          username: '123',
          amount: 1,
        }
      ]),
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

  @Get('/about')
  @Render('about')
  about(@Req() req: Request) {
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
