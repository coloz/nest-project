import { Controller, Get, Post, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Apkfile } from './apkfile.entity';
import { ApkfileService } from './apkfile.service';

@Controller('apkfile')
export class ApkfileController {
    constructor(
        private readonly apkfileService: ApkfileService
    ) { }

    @Get()
    getLatest(): string {
        return this.apkfileService.getLatest();
    }

    @Get('all')
    getAll(): Promise<Apkfile[]> {
        return this.apkfileService.findAll();
    }

    @Get(':version')
    getVersion(@Param('version') version): string {
        console.log(version);
        return `GET ${version} `;
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file): Promise<any> {
        console.log(file);
        let apkfile = await this.apkfileService.getApkFileInfo(file)
        return this.apkfileService.create(apkfile);
    }
    
}