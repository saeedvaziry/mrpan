import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as exphbs from 'express-handlebars';
import * as session from 'express-session';
import * as mysqlStore from 'express-mysql-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';

const MySQLStore = mysqlStore(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      logger: process.env.APP_ENV === 'production' ? ['error'] : true
    }
  );

  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.use(
    session({
      store: new MySQLStore({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      }),
      secret: process.env.APP_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine('.hbs', exphbs({ extname: '.hbs' }));
  app.set('view engine', '.hbs');

  app.enable('trust proxy');
  app.use((req, res, next) => {
    if (!req.secure && process.env.APP_ENV === "production") {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  });

  await app.listen(3000);
}
bootstrap();
