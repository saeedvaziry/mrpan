import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TwitterStrategy } from './twitter.strategy';
import { TwitterSerializer } from './twitter.serializer';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'twitter',
      session: true
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, TwitterStrategy, TwitterSerializer]
})
export class AuthModule {}
