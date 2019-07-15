import { Injectable } from '@nestjs/common';
import { APP_CONFIG } from './config/app.config';
// import { ApkfileService } from './apkfile/apkfile.service';
const ApkReader = require('adbkit-apkreader')
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apkfile } from './apkfile/apkfile.entity';
// import { ApkFile } from './apkfile.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Apkfile)
    private readonly apkFileRepository: Repository<Apkfile>,
  ) { }

  getHello(): string {
    return 'App Version Manager';
  }

  getApkFileInfo(file): Promise<any> {
    return ApkReader.open(APP_CONFIG.UPLOAD_PATH + file.originalname)
      .then(reader =>
        reader.readManifest().then(data => {
          // console.log(data);
          let apkfile = {
            filename: file.originalname,
            size: file.size,
            package: data.package,
            version: data.versionName,
          }
          return apkfile
        })
      )
  }


  findAll(): Promise<Apkfile[]> {
    return this.apkFileRepository.find();
  }

  create(apkfile) {
    const apk = this.apkFileRepository.create(
        {
        filename: apkfile.filename,
        size: apkfile.size,
        package: apkfile.package,
        version: apkfile.version,
        // updateDate: new Date()
      }
    );
    this.apkFileRepository.save(apk);
  }

}
