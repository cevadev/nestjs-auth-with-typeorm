import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
//Reflector nos permite leer los parametros de la metadata
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';
//payloadtoken nos retorna el rol e identificador
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //obtenemos el array de roles de la metadata del endpoint
    //para el caso de createProduct del controller dicho metodo tienen Role.ADMIN
    //por lo que el array que recibirá sera: ['admin']
    //ahora lo que debemos hacer es  validar el rol del usuario autentificado y comprarlo con el rol permitido
    //para llamar el endpoint, si abos roles coinciden entonces se permite llamar al endpoint de lo contrario no
    const roles: Role[] = this.reflector.get(ROLES_KEY, context.getHandler());
    //si el endpoint consultado no tiene roles, quiere decir que es de acceso libre y dejamos pasar
    if (!roles) {
      return true;
    }

    //obtenemos al user del request
    const request = context.switchToHttp().getRequest();

    //payloadToken={role: 'admin', sub: 1234}
    const user = request.user as PayloadToken;

    //ahora que tenemos el rol del usuario, hacemos la validacion del rol de usuario con el o los roles permitidos
    //para llamar al endpoint createProducts() por ejemplo

    //vamos a recorrer el array de roles y verificar si algun rol o roles conside con el rol del user
    const isAuth = roles.some((role) => role === user.role);
    if (!isAuth) {
      throw new UnauthorizedException(
        'Not allowed: You do not have the role required for this operation',
      );
    }
    return isAuth;
  }
}
