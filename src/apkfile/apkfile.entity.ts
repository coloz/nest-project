import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('apkfile')
export class Apkfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  size: number;

  @Column()
  package: string;

  @Column()
  version: string;

  // @Column()
  // file: boolean;

  // @CreateDateColumn()
  // updateDate:string;
}