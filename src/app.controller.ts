import { Controller, Get, Post, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getLatest(): string {
    return this.appService.getHello();
  }

  @Get(':version')
  getVersion(@Param('version') version): string {
    console.log(version);
    return `This action returns a #${version} cat`;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file): Promise<any> {
    console.log(file);
    return this.appService.getApkFileInfo(file)
  }

}

export class ApkVersion {
  readonly version: string;
  readonly url: string;
  readonly description: string;
}