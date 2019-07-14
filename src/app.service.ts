import { Injectable } from '@nestjs/common';
import { APP_CONFIG } from './config/app.config';
const ApkReader = require('adbkit-apkreader')


@Injectable()
export class AppService {
  getHello(): string {
    return 'App Version Manager';
  }

  getApkFileInfo(file): Promise<any> {
    return ApkReader.open(APP_CONFIG.UPLOAD_PATH + file.originalname)
      .then(reader =>
        reader.readManifest().then(data => {
          console.log(data);
          return {
            filename: file.originalname,
            size:file.size,
            package: data.package,
            version: data.versionName,
          }
        })
      )
  }
}
