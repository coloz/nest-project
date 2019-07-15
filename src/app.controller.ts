import { Controller, Get } from '@nestjs/common';
import { APP_CONFIG } from './config/app.config';

@Controller()
export class AppController {

  @Get()
  getAppName(): string {
    return APP_CONFIG.APP_NAME + ' v' + APP_CONFIG.APP_VERSION
  }

}
