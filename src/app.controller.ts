import { Controller, Get, Post, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Apkfile } from './apkfile.entity';
// import { ApkfileService } from './apkfile/apkfile.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly apkfileService: ApkfileService
  ) { }

  @Get()
  getLatest(): string {
    return this.appService.getHello();
  }

  @Get('all')
  getAll(): Promise<Apkfile[]> {
    return this.appService.findAll();
  }

  @Get(':version')
  getVersion(@Param('version') version): string {
    console.log(version);
    return `This action returns a #${version} cat`;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file): Promise<any> {
    // console.log(file);
    let apkfile = await this.appService.getApkFileInfo(file)
    this.appService.create(apkfile);
    return apkfile
  }
}

export class ApkVersion {
  readonly version: string;
  readonly url: string;
  readonly description: string;
}