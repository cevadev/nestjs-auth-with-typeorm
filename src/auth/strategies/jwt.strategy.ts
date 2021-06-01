import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
//la estrategia a usar es un password local
import { Strategy, ExtractJwt } from 'passport-jwt';

import config from '../../config';
//tipado del token
import { PayloadToken } from '../models/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    //cuando queremos inyectar en constructor debemos usar el decorator Inject
    @Inject(config.KEY) configService: ConfigType<typeof config>,
  ) {
    super({
      //definimos de donde sale el token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //no ignora expiracion del token
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  /**
   * una vez obtenido eltoken lo pasamos y validate procesa el token
   */
  validate(payload: PayloadToken) {
    //retornamos la info
    return payload;
  }
}
