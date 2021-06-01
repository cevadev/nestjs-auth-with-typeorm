import { Injectable, ExecutionContext } from '@nestjs/common';
//estrategia de guard
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

//heredamos las funcionalidad de AuthGuard
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    //llamamos constructor de la clase padre
    super();
  }

  //extendemos la funcion canActive
  canActivate(context: ExecutionContext) {
    //Obtenemos la metadata de si el endpoint es publico
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      //damos permisos al ser un endpoint publico
      return true;
    }
    //si no es un endpoint publico, que lo haga la validacion por defecto como esta seteado en el AuthGuard
    return super.canActivate(context);
  }
}
