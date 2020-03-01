import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'TB_USR'
})
export class User {
  @PrimaryGeneratedColumn({
    name: 'ID'
  })
  id: number;

  @Column({
    name: 'USR'
  })
  user: string;

  @Column({
    name: 'PSW'
  })
  password: string;

  @Column({
    name: 'NAME'
  })
  name: string;
}