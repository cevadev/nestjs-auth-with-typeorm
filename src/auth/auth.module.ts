import { Module } from '@nestjs/common';

//importamos PassportModule para que AuthModule trabaje con localStrategy
import { PassportModule } from '@nestjs/passport';
//usamos el modulo de JWT
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
//local.strategy serpa tratado como un provider mas
import { LocalStrategy } from './strategies/local.strategy';
//strategy que maneja los JWT
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controller/auth.controller';
//config para leer la JWT_KEY del archivo .env
import config from '../config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      //inyectamos la variable de entorno JWT_SECRET al useFactory
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
    /* JwtModule.register({
      //definimos la llave (la cual deberia estar declara en una variabl de entorno)
      secret: 'ffyvh32',
      //definimos una opciones
      signOptions: {
        //expiracion de 10 dias
        expiresIn: '10d',
      },
    }), */
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
