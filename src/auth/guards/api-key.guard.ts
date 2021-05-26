import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';

//importamos el Request tipado de express
import { Request } from 'express';

//Reflector nos permite leer los parametros de la metadata
import { Reflector } from '@nestjs/core';

import { ConfigType } from '@nestjs/config';

//importamos la llave de nuestro decorator personalizado
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

//import archivo de configuracion
import config from '../../config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  //inyectamos a Reflector en el constructor
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //obtenemos la metadata con el Reflector
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    //isPublic es true, no es necesario validar el token, que retorne true
    if (isPublic) {
      return true;
    }

    //obtenemos el request
    const request = context.switchToHttp().getRequest<Request>();
    //obtenemos la autorizacion del header
    const authHeader = request.header('Auth');
    //esperamos que dentro de la cabecera del request exista en el header na variable llamada Auth con un valor 1234
    //si no está, no se podrá acceder la endpoint
    const isAuth = authHeader === this.configService.apiKey;
    if (!isAuth) {
      //no se encontro la variable Auth o su valor no es 1234
      throw new UnauthorizedException('access prohibited');
    }
    return isAuth;
  }
}
