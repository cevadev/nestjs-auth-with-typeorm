import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';

import * as bcrypt from 'bcrypt';

/**
 * Para hacer el login debemos verificar un usuario de acuerdo al email, para ello importamos el servicio de usuarios
 * Para trabajar con el servicio es necesario importarlo en el auth.module.ts
 */

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

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
}
