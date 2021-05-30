import { Module } from '@nestjs/common';
//importamos PassportModule para que AuthModule trabaje con localStrategy
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
//local.strategy serpa tratado como un provider mas
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
