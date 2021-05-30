//Una strategy es como un servicio

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
//la estrategia a usar es un password local
import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth.service';

//hacemos posible que la clase se puede inyectar en otra via el constructor
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    //llamamos al constructor de la clase PassportStrategy
    super();
  }

  async validate(email: string, password: string) {
    const user = this.authService.validateUser(email, password);

    if (!user) {
      //usuario no autorizado
      throw new UnauthorizedException('Not allowed');
    }

    //todo ok
    return user;
  }
}
