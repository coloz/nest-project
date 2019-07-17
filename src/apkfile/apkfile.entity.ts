import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('apkfile')
export class Apkfile {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn()
  md5: string;

  @Column()
  filename: string;

  @Column()
  size: number;

  @Column()
  package: string;

  @Column()
  version: string;

  @Column()
  versionCode: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}