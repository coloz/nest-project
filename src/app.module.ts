import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import multer = require('multer');
import { APP_CONFIG } from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apkfile } from './apkfile.entity';
// import { ApkFile } from './apkfile/apkfile.entity';
// import { ApkfileModule } from './apkfile/apkfile.module';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, APP_CONFIG.UPLOAD_PATH);
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: fileFilter
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './sqlite/mydb.db',
      entities:[Apkfile],
      // timezone:'local',
      synchronize: true,
      logger:"debug",
    }),
    TypeOrmModule.forFeature([Apkfile])
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }

// 后缀检查
function checkFileExt(ext, allow = true, rule = 'apk') {
  if (!ext) return false;
  if (allow) return rule.includes(ext);
  return !rule.includes(ext);
}

function fileFilter(req, file, cb) {
  let ext = file.originalname.split('.');
  ext = ext[ext.length - 1];
  // 检查文件后缀是否符合规则
  if (checkFileExt(ext, true)) {
    cb(null, true);
  } else {
    // 不符合规则，拒绝文件并且直接抛出错误
    cb(null, false);
    cb(new Error('文件类型错误'));
  }
}