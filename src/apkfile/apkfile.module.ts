import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApkfileService } from './apkfile.service';
import { Apkfile } from './apkfile.entity';
import { ApkfileController } from './apkfile.controller';
import { MulterModule } from '@nestjs/platform-express';
import multer = require('multer');
import { APP_CONFIG } from '../config/app.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Apkfile]),
        MulterModule.register({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, APP_CONFIG.UPLOAD_PATH)
                },
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
            fileFilter: fileFilter
        })
    ],
    providers: [ApkfileService],
    controllers: [ApkfileController],
})
export class ApkfileModule { }

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