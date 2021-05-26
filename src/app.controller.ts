import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard';

//importamos nuestro decorator personalizado
import { Public } from './auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@SetMetadata('isPublic', true)
  @Public() //aplicamos nuestro decorator personalizado
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //@UseGuards(ApiKeyGuard)
  @SetMetadata('isPublic', true)
  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
}
