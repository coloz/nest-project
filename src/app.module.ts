import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apkfile } from './apkfile/apkfile.entity';
import { ApkfileModule } from './apkfile/apkfile.module';


@Module({
  imports: [
    ApkfileModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './sqlite/mydb.db',
      entities: [Apkfile],
      synchronize: true,
      logger: "debug",
    })
  ],
  controllers: [
    AppController
  ]
})
export class AppModule { }
