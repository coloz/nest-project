import { Injectable } from '@nestjs/common';
import { APP_CONFIG } from './config/app.config';

const ApkReader = require('adbkit-apkreader')
var crypto = require('crypto');
var fs = require('fs');

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apkfile } from './apkfile.entity';

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
            // md5: 
          }
          return apkfile
        })
      )
  }

  getMd5(file) {
    let buffer = fs.readFileSync(APP_CONFIG.UPLOAD_PATH + file.filename);
    let fsHash = crypto.createHash('md5');

    fsHash.update(buffer);
    return fsHash.digest('hex');
  }


  findAll(): Promise<Apkfile[]> {
    return this.apkFileRepository.find();
  }

  create(apkfile) {
    let apkfileData={
        filename: apkfile.filename,
        size: apkfile.size,
        package: apkfile.package,
        version: apkfile.version,
        md5: this.getMd5(apkfile)
    }
    const apk = this.apkFileRepository.create(apkfileData);
    this.apkFileRepository.save(apk);
    return apkfileData
  }

}
