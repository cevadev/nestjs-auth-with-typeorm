import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  /**
   * req-> recibimos el request que viene de express
   * usamos un guardian y protegemos el login con el AuthGuard llamada local de acuerdo con nuestra estrategia creada
   * antes de llegar y obtener el request debe pasar por el guard. el guard verificara el user y contraseña, aplicara´
   * la logica del strategy haciendo la validacion y si coincide nos retorna el usuario
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    //retornmos el user loggeado
    return req.user;
  }
}
