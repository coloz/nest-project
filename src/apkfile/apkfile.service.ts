import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apkfile } from './apkfile.entity';
import { APP_CONFIG } from '../config/app.config';

const ApkReader = require('adbkit-apkreader')
var crypto = require('crypto');
var fs = require('fs');

// var UPLOAD_PATH = './';

@Injectable()
export class ApkfileService {
    constructor(
        @InjectRepository(Apkfile)
        private readonly apkfileRepository: Repository<Apkfile>,
    ) { }

    findAll(): Promise<Apkfile[]> {
        return this.apkfileRepository.find();
    }

    async getLatest() {
        let max = await this.apkfileRepository.createQueryBuilder()
            .select("MAX(versionCode)", "versionCode")
            .getRawOne()
        return this.apkfileRepository.createQueryBuilder()
            .where("versionCode = :versionCode", max)
            .getOne()
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
                        versionCode: data.versionCode
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

    create(apkfile) {
        let apkfileData = {
            filename: apkfile.filename,
            size: apkfile.size,
            package: apkfile.package,
            version: apkfile.version,
            versionCode: apkfile.versionCode,
            md5: this.getMd5(apkfile)
        }
        const apk = this.apkfileRepository.create(apkfileData);
        this.apkfileRepository.save(apk);
        return apkfileData
    }
}