import { Module } from '@nestjs/common';
import { TwitterModule } from 'src/twitter/twitter.module';
import { UsersModule } from 'src/users/users.module';
import { CircleController } from './circle.controller';
import { CircleService } from './circle.service';

@Module({
  imports: [
    UsersModule,
    CircleModule,
    TwitterModule
  ],
  controllers: [CircleController],
  providers: [CircleService]
})
export class CircleModule {}
