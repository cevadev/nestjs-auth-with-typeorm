import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
//import para la creacion de un jwt
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';
//import del tipado para nuestro payload, es decir, indicamos que nuestro payload debe tener esta estrcutura
import { PayloadToken } from '../models/token.model';

/**
 * Para hacer el login debemos verificar un usuario de acuerdo al email, para ello importamos el servicio de usuarios
 * Para trabajar con el servicio es necesario importarlo en el auth.module.ts
 */
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    //inyectamos la dependencia JwtService
    private jwtService: JwtService,
  ) {}

  //metodo para validar un usuario
  async validateUser(email: string, password: string) {
    //traemos al usuario de la BD con su password en formato hash
    const user = await this.userService.findByEmail(email);

    if (user) {
      //password enviado coincide con el password de BD retorna true
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }

    return null;
  }

  /**
   * Generamos el Json web token
   * user -> recibimos el User que su login fue exitoso
   */
  generateJWT(user: User) {
    //obtenemos del user (payload que contendra el rol e id del user tipado) para encriptarlo dentro del JWT
    //nuestro JWT contendra el id y rol del usuario que hizo login
    const payload: PayloadToken = {
      //role del user
      role: user.role,
      //sub: identificador del user
      sub: user.id,
    };
    //retornamos el access_toke generado por el JwtService y el user loggeado
    return {
      access_token: this.jwtService.sign(payload),
      //enviamos el user
      user,
    };
  }
}
