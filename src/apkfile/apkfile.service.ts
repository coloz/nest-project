import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apkfile } from './apkfile.entity';

@Injectable()
export class ApkfileService {
    constructor(
        @InjectRepository(Apkfile)
        private readonly apkFileRepository: Repository<Apkfile>,
    ) { }

    findAll(): Promise<Apkfile[]> {
        return this.apkFileRepository.find();
    }

    create(apkfile) {
        const user = this.apkFileRepository.create({
            filename: apkfile.filename,
            size: apkfile.size,
            package: apkfile.package,
            version: apkfile.version,
            updateDate: new Date()
        });
    }


}